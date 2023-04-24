<template>
	<div class="menu-btn-wrap">
		<div class="menu-btn" >
			<label class="btn" @click="action(0)" >全局总览</label>
			<label class="btn" :class="{['btn-select']: path === '/treeEntryPage'}"  @click="action(1)" >工程概况</label>
			<label class="btn-center"  @click="action(2)" >
				<span>
					数字<br>孪生
				</span>
				<img :src="centerImg" class="center-img" >
			</label>
			<label class="btn" :class="{['btn-select']: path === '/largeScreen/build'}" @click="action(3)" >开始挖掘</label>
			<label class="btn" @click="action(4)" >挖掘恢复</label>
		</div>
	</div>
</template>

<script>
import { useRouter } from 'vue-router'
import eventHub from '../../../../utils/eventHub'

let router = null
export default {
	data() {
		return {
			paths: ['', '/treeEntryPage', '/twin', '/largeScreen/build', ''],
			currentPath: ''
		}
	},
	setup() {
		router = useRouter()
	},
	computed: {
		path() {
			return router.currentRoute.value.fullPath
		},
		centerImg() {
			return new URL(`../../../../assets/images/CaveScreenDemo/menu/${this.path === '/twin' ? 'btn-center-s' : 'btn-center'}.png`, import.meta.url).href
		}
	},
	mounted() {

	},

	methods: {
		action(index) {
		    switch (index) {
		        case 2:
                    eventHub.emit('backHome')
                    break
		        case 3:
                    eventHub.emit('startCaving')
                    break
                case 4:
                    eventHub.emit('cavingRecover')
                    break
            }
		}
	}

}
</script>

<style lang="less" scoped>
	@keyframes fadenum{
		100%{
			transform:rotate(360deg);
		}
	}
    .menu-btn-wrap {
        z-index: 999;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 122px;
        background: url("../../../../assets/images/CaveScreenDemo/btn-bottom-wrap.png") no-repeat center center / 100% 100%;
        .menu-btn {
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 10px;
            left: calc(50% - 291px);
            z-index: 999;
            pointer-events: auto;
            .btn{
                font-family: fz;
                display: inline-block;
                color: #00FFF4;
                font-size: 15px;
                width: 95px;
                height: 52px;
                line-height: 52px;
                text-align: center;
                background-image: url("../../../../assets/images/CaveScreenDemo/menu/btn-bg.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                margin-right: 30px;
                cursor: pointer;
                z-index: 1;
                position: relative;
                overflow: hidden;
                &::after {
                    content: '';
                    left: 0px;
                    right: 0px;
                    height: 20px;
                    top: -20px;
                    background-image:linear-gradient(to bottom, rgba(8, 214, 207, 1), rgba(8, 214, 207, 0));
                    position: absolute;
                    transition: 0.4s ease;
                }
                &::before{
                    content: '';
                    left: 0px;
                    right: 0px;
                    height: 20px;
                    bottom: -20px;
                    background-image:linear-gradient(to bottom, rgba(8, 214, 207, 0), rgba(8, 214, 207, 1));
                    position: absolute;
                    transition: 0.4s ease;
                }
                &:hover{
                    background-image: url("../../../../assets/images/CaveScreenDemo/menu/btn-bg-s.png");
                    color: #FFFFFF;
                    &::after{
                        top: 0px;
                    }
                    &::before{
                        bottom: 0px;
                    }
                }
            }
            .btn-select{
                background-image: url("../../../../assets/images/CaveScreenDemo/menu/btn-bg-s.png");
                color: #FFFFFF;
                &::after{
                    top: 0px;
                }
                &::before{
                    bottom: 0px;
                }
            }
            .btn-center{
                cursor: pointer;
                font-family: fz;
                display: inline-block;
                color: #FFFFFF;
                font-size: 16px;
                width: 100px;
                height: 100px;
                text-align: center;
                margin-right: 30px;
                position: relative;
                box-sizing: border-box;
                padding-top: 27px;
                .center-img{
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    height: 100%;
                    width: 100%;
                }
                &:hover{
                    img{
                        animation:fadenum 3s linear infinite;
                    }
                }
            }
        }
    }
</style>
