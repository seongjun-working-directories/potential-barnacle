<template>
    <div>
        Information
        <ul>
            <li>{{id}}</li>
            <li>{{title}}</li>
            <li>{{likes}}</li>
            <li>{{isPublished}}</li>
            <li>{{commentIds}}</li>
            <li>{{author}}</li>
        </ul>
    </div>
</template>
<script>
    /* eslint-disable */
    export default {
        name: 'Blog Post',
        props: {
            id: Number,
            title: String,
            likes: {
                type: Number,
                default: 0,
            },
            isPublished: {
                type: Boolean,
                default: false,
            },
            commentIds: {
                type: Object,
                default: [],
            },
            author: {
                type: Object,
                default: {
                    name: 'NAME',
                    company: 'COMAPNY',
                }
            }
        }
    }
</script>