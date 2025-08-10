<!-- Language: vue -->
<script setup>
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import KycUpload from './KycUpload.vue'

// Mock UploadCard
vi.mock('./UploadCard.vue', () => ({
    default: {
        name: 'UploadCard',
        template: '<div><slot></slot></div>',
        props: ['title', 'accept', 'file', 'preview']
    }
}))

// Mock axios
vi.mock('axios', () => ({
    default: {
        post: vi.fn()
    }
}))
import axios from 'axios'

// Mock ZXing
const fakeDecodeResult = { text: '<pin>12345</pin><name>John Doe</name>', format: 'CODE128' }
const decodeFromImageElement = vi.fn().mockResolvedValue(fakeDecodeResult)
vi.mock('@zxing/library', () => ({
    BrowserMultiFormatReader: vi.fn().mockImplementation(() => ({
        decodeFromImageElement
    })),
    NotFoundException: class extends Error {}
}))

describe('KycUpload.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(KycUpload)
        decodeFromImageElement.mockClear()
        axios.post.mockClear()
    })

    it('renders headings and buttons', () => {
        expect(wrapper.text()).toContain('NID Upload (Front & Back)')
        expect(wrapper.text()).toContain('Scan Result')
        expect(wrapper.find('button').exists()).toBe(true)
    })

    it('renders two UploadCard components', () => {
        const cards = wrapper.findAllComponents({ name: 'UploadCard' })
        expect(cards.length).toBe(2)
    })

    it('handles file selection and preview for front', async () => {
        const file = new File(['front'], 'front.jpg', { type: 'image/jpeg' })
        await wrapper.vm.onSelect('front', file)
        expect(wrapper.vm.front.file).toBe(file)
        expect(wrapper.vm.front.preview).toContain('blob:')
    })

    it('handles file selection and triggers barcode scan for back', async () => {
        const file = new File(['back'], 'back.jpg', { type: 'image/jpeg' })
        await wrapper.vm.onSelect('back', file)
        await flushPromises()
        expect(decodeFromImageElement).toHaveBeenCalled()
        expect(wrapper.vm.back.file).toBe(file)
        expect(wrapper.vm.scanResult).toEqual({
            text: fakeDecodeResult.text,
            format: fakeDecodeResult.format
        })
    })

    it('displays scan result in the UI', async () => {
        wrapper.vm.scanResult = { text: 'abc', format: 'CODE128' }
        await wrapper.vm.$nextTick()
        expect(wrapper.html()).toContain('abc')
        expect(wrapper.html()).toContain('CODE128')
    })

    it('clears all data on clearAll', async () => {
        wrapper.vm.front.file = new File(['a'], 'a.jpg', { type: 'image/jpeg' })
        wrapper.vm.front.preview = 'blob:front'
        wrapper.vm.back.file = new File(['b'], 'b.jpg', { type: 'image/jpeg' })
        wrapper.vm.back.preview = 'blob:back'
        wrapper.vm.scanResult = { text: 'abc', format: 'CODE128' }
        await wrapper.vm.clearAll()
        expect(wrapper.vm.front.file).toBeNull()
        expect(wrapper.vm.front.preview).toBeNull()
        expect(wrapper.vm.back.file).toBeNull()
        expect(wrapper.vm.back.preview).toBeNull()
        expect(wrapper.vm.scanResult).toBeNull()
    })

    it('submits form with both files and scanResult', async () => {
        wrapper.vm.front.file = new File(['a'], 'a.jpg', { type: 'image/jpeg' })
        wrapper.vm.back.file = new File(['b'], 'b.jpg', { type: 'image/jpeg' })
        wrapper.vm.scanResult = { text: 'barcode', format: 'CODE128' }
        axios.post.mockResolvedValue({ data: { success: true, barcode_data: { text: 'server', format: 'CODE128' } } })
        window.alert = vi.fn()
        await wrapper.vm.submit()
        expect(axios.post).toHaveBeenCalled()
        expect(window.alert).toHaveBeenCalledWith('Upload successful')
        expect(wrapper.vm.scanResult.text).toBe('server')
    })

    it('shows alert if files are missing on submit', async () => {
        wrapper.vm.front.file = null
        wrapper.vm.back.file = null
        window.alert = vi.fn()
        await wrapper.vm.submit()
        expect(window.alert).toHaveBeenCalledWith('Please provide both front and back images')
        expect(axios.post).not.toHaveBeenCalled()
    })
})
</script>