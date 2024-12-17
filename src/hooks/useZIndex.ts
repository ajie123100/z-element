import { computed, ref } from "vue"

const zIndex = ref(0)

const useZIndex = (initVal = 2000) => {
    const initZIndex = ref(initVal)
    const currentZIndex = computed(() => zIndex.value + initZIndex.value)
    const nextZIndex = () => {
        zIndex.value++
        return currentZIndex
    }
    return {
        currentZIndex,
        initZIndex,
        nextZIndex,
    }
}

export default useZIndex