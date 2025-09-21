
<template>
    <div class="flex items-center justify-center w-full py-30">
        <div class="container">
            <div class="card" data-aos="fade-up">
                <Timeline :value="events" align="alternate" class="customized-timeline">
                    <template #marker="slotProps">
                        <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm" :style="{ backgroundColor: slotProps.item.color }">
                            <i :class="slotProps.item.icon"></i>
                        </span>
                    </template>
                    <template #content="slotProps">
                        <Card class="mt-4 !bg-white !text-gray-800" data-aos="fade-up">
                            <template #title>
                                {{ slotProps.item.status }}
                            </template>
                            <template #subtitle>
                                <span class="text-gray-600">{{ slotProps.item.date }}</span>
                            </template>
                            <template #content>
                                <img v-if="slotProps.item.image" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.item.image}`" :alt="slotProps.item.name" width="200" class="shadow-sm" />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                                    neque quas!
                                </p>
                                <Button label="Read more" variant="text"></Button>
                            </template>
                        </Card>
                    </template>
                </Timeline>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const events = ref([
    { status: 'Create an account', date: 'Just open our website or mobile', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Verify phone', date: 'Verify your phone number with 6 digits OTP code', icon: 'pi pi-check', color: '#607D8B' },
    { status: 'Capture NID Front side', date: 'Scan or capture your smart NID front side', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'Capture NID Back side', date: 'Scan or capture your smart NID back side', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Your\'re ready to use ABPay', date: 'Welcome to ABPay. Your wallet is ready to make any transactions', icon: 'pi pi-cog', color: '#00ffee' },
]);

</script>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    ::v-deep(.customized-timeline) {
        .p-timeline-event:nth-child(even) {
            flex-direction: row;

            .p-timeline-event-content {
                text-align: left;
            }
        }

        .p-timeline-event-opposite {
            flex: 0;
        }
    }
}
</style>
