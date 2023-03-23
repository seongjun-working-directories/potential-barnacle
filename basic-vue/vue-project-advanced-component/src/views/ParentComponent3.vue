<template>
    <div>
        <!--
            커스텀 이벤트인 send-message는 자식 컴포넌트에서 $emit으로 호출하게 됨
            이때 부모 컴포넌트에 정의된 sendMessage 함수가 실행되며,
            자식 컴포넌트로부터 전달받은 데이터를 부모 컴포넌트에서 사용 가능
        -->
        <ChildComponent3 @send-message="sendMessage" />
        자식 컴포넌트에서 넘어온 값 : {{ data }}
    </div>
</template>
<script>
    import ChildComponent3 from './ChildComponent';

    export default {
        components: {
            ChildComponent3
        },
        methods: {
            sendMessage(data) {
                console.log(data);
            }
        }
    }
</script>