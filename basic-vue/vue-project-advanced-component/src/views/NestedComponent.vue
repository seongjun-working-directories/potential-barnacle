<template>
    <div>
        <PageTitle />
        <hr/>
        <!-- 부모 컴포넌트 -->

        <!-- 정적 데이터 전달 -->
        <!-- props에 title 속성을 정의해놨으므로, NestedComponent에서 데이터 전달 가능 -->
        <PageTitleUsingProps title='부모 컴포넌트에서 자식 컴포넌트로 데이터 전달'/>
        <hr/>

        <!-- 동적 데이터 전달 -->
        <!-- props에 등록된 title이라는 속성명 앞에 콜론(:)을 붙임 -->
        <PageTitleUsingProps :title="titleName" />
        <hr/>

        <!--
            [주의사항]
            v-bind로 전달하지 않은 props는 전부 문자열로 인식됨
            ex) <BlogPost likes="42">   => props는 "42"라는 문자열로 받음
        
            따라서, 실제 데이터 형식을 제대로 전달하고자할 경우, v-bind로 전달
            ex)
        -->
            <BlogPost :likes="42" /><br/>숫자<hr/>
            <BlogPost :likes="post.likes" /><br/>숫자(동적)<hr/>
            <BlogPost :isPublished="true" /><br/>불리언<hr/>
            <BlogPost :isPublished="post.isShow" /><br/>불리언(동적)<hr/>
            <BlogPost :commentIds="[234, 1324, 986]" /><br/>배열<hr/>
            <BlogPost :commentIds="post.commentIds" /><br/>배열(동적)<hr/>
            <BlogPost :author="{name: 'Veronica', company: 'Veridian Dynamics'}" /><br/>객체<hr/>
            <BlogPost :author="post.author" /><br/>객체(동적)<hr/>
            <BlogPost v-bind="post" /><br/>객체의 속성 전달<hr/>
            <BlogPost :id="post.id" :title="post.title" /><br/>객체의 속성 전달(동적)<hr/>
    </div>
</template>
<script>
import PageTitle from '../components/PageTitle.vue';
import PageTitleUsingProps from '../components/PageTitleUsingProps.vue';
import BlogPost from '../components/BlogPost.vue';

export default {
    components: {
        PageTitle,
        PageTitleUsingProps,
        BlogPost,
    },
    data() {
        return {
            titleName: '동적 데이터 전달',
            post: {
                id: 1,
                title: 'VUEJS',
                likes: 142,
                isShow: true,
                commentIds: [1324, 986, 1534],
                author: {name:'VUE', company:'VUE-OFFICIAL'},
            }
        }
    }
}
</script>