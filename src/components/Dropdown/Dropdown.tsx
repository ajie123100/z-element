import type { Options, Placement } from "@popperjs/core";
import { computed, defineComponent, Fragment, ref, type PropType } from "vue";
import type { MenuOption } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { TooltipInstance } from "../Tooltip/types";

export default defineComponent({
    name: 'ZDropdown',
    props: {
        placement: {
            type: String as PropType<Placement>,
            default: 'bottom'
        },
        trigger: {
            type: String as PropType<'click' | 'hover'>,
            default: 'hover'
        },
        transition: {
            type: String,
            default: 'fade'
        },
        openDelay: {
            type: Number,
            default: 0
        },
        closeDelay: {
            type: Number,
            default: 0
        },
        popperOptions: {
            type: Object as PropType<Options>
        },
        menuOptions: {
            type: Array as PropType<MenuOption[]>,
            required: true
        },
        hideAfterClick: {
            type: Boolean,
            default: true
        },
        manual: {
            type: Boolean
        }
    },
    emits: ['visible-change', 'select'],
    setup(props, { slots, emit, expose }) {
        const tooltipRef = ref<TooltipInstance | null>(null)
        const itemClick = (e: MenuOption) => {
            if (e.disabeled) return
            emit('select', e)
            if (props.hideAfterClick) {
                tooltipRef.value?.hide()
            }
        }
        const visibleChange = (e: boolean) => {
            emit('visible-change', e)
        }
        const options = computed(() => {
            return props.menuOptions.map(item => {
                return (
                    <Fragment key={item.key}>
                        {item.divided ? <li role="separator" class="divided-placeholder"></li> : ''}
                        <li id={`dropdown-item-${item.key}`}
                            class={{ 'z-dropdown__item': true, 'is-disabled': item.disabeled, 'is-divided': item.divided }}
                            onClick={() => itemClick(item)}
                        >
                            {item.label}
                        </li>
                    </Fragment>
                )
            })
        })
        expose({
            show: () => tooltipRef.value?.show(),
            hide: () => tooltipRef.value?.hide()
        })
        return () => (
            <div class="z-dropdown">
                <Tooltip trigger={props.trigger} placement={props.placement} popperOptions={props.popperOptions} openDelay={props.openDelay}
                    closeDelay={props.closeDelay} ref={tooltipRef}
                    onVisible-change={visibleChange}
                >
                    {{
                        default: () => slots.default && slots.default(),
                        content: () => (
                            <ul class="z-dropdown__menu">
                                {options.value}
                            </ul>
                        )
                    }}
                </Tooltip>
            </div>
        )
    }
})