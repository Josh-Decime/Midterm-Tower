<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div :class="`modal-dialog modal-sm modal-${modalSize}`" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <slot>


                    </slot>


                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import EventForm from './EventForm.vue'
export default {
    props: { modalId: { type: String, required: true }, modalSize: { type: String, default: 'xl' } },
    setup() {
        return {}
    },
    components: { EventForm }
};
</script>


<style lang="scss" scoped></style>