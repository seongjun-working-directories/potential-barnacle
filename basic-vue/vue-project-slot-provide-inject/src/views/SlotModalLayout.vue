<template>
    <div class="modal-container">
        <header>
            <slot name="header">
                <h1>아직 정의된 Header가 없습니다.</h1>
            </slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>
<script>
    export default {
        name: 'SlotModalLayout'
    }
</script>