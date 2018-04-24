<template>
    <div>
        参加活动有惊喜
        <mu-chip class="demo-chip" backgroundColor="blue300" @delete="handleClose" showDelete>
            <mu-avatar color="blue300" backgroundColor="indigo900" :size="32">MB</mu-avatar> custom chip
        </mu-chip>
        <mu-chip class="demo-chip" backgroundColor="blue300" @delete="handleClose" showDelete>
            <mu-avatar color="blue300" backgroundColor="indigo900" :size="32">MB</mu-avatar> custom chip
        </mu-chip>

        <br/>
        <mu-date-picker mode="landscape" hintText="横屏模式选择" /> <br/>

        <mu-back-top :height="500"/>
    </div>
</template>

<script>
    export default {
        name: "activity",
        methods: {
            handleClose () {
                window.alert('你点击了删除按钮')
            }
        }
    }
</script>

<style scoped>

</style>