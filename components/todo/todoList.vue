<template>
	<view class="todoMain">
		  <h2 class="todo-title">
		    ToDoList
		  </h2>
		  <section class='todoapp'>
			<header class="header">
			  <!-- 双向数据绑定的input是响应式 -->
			  <input
			    confirm-type="search" 
				@confirm="addTodo"
			    class="new-todo"
			    placeholder="What needs to be done?"
			    autocomplete="off"
			    v-model="input"
			  />
			</header>
			<section class="itemMain">
				<checkbox-group @change="allDone">
					<checkbox id="toggle-all" class="toggle-all" :checked="this.remainCount===todos.length"/>
				</checkbox-group>
			      <ul class="todo-list">
			        <li
			          v-for="todo in todos"
			          :key="todo.text"
			          :class="{
			            completed: todo.completed,
			          }"
			        >
			          <view class="view">
						<checkbox-group @change='changeState(todo)'>
							<checkbox class='toggle' :checked="todo.completed"/>
						</checkbox-group>
						 <label>{{ todo.text }}</label>
			            <button class="destroy" @click="remove(todo)"></button>
			          </view>
			        </li>
			      </ul>
			    </section>

		  </section>
	</view>
</template>

<script>
	import useLocalstorage from '../../untils/useLocalstorage.js'
	import getLength from '../../untils/getLength.js'
	export default {
		name:'todoList',
		data(){
			return{
				input:'',
				todos:[],
			}
		},
		computed:{
			remainCount(){
				let rmCount = 0;
				this.todos.forEach(item=>{
					if(item.completed) rmCount++;
				})
				return rmCount;
			}
		},
		watch:{
			todos:{
				deep:true,
				handler(newValue){
					const uniLocalStorage = useLocalstorage();
					uniLocalStorage.setItem("TODOKEYS",newValue);
				}
			}
		},
		methods:{
			addTodo(){
				const text = this.input?.trim(); //?代表可选属性，可能会不存在(防止没有value值报错)
				if (getLength(text) === 0) return;
				this.todos.unshift({
				  text,
					completed: false, //该词条的状态
				});
				this.input = "";
			},
			remove(todo){
			    const index = this.todos.indexOf(todo);
			    this.todos.splice(index, 1);
			},
			allDone(e){
				let flag;
				getLength(e.detail.value) === 1 ? flag = true:flag= false;
				this.todos.forEach(item=>{
					item.completed = flag;
				})
			},
			changeState(todo){
				this.todos.forEach(item=>{
					if(item===todo){
						item.completed = !item.completed;
					}
				})
			}

		},
		mounted() {
			const uniLocalStorage = useLocalstorage();
			if(uniLocalStorage.getItem("TODOKEYS")){
				this.todos = uniLocalStorage.getItem("TODOKEYS");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.todoMain{
		width: 550rpx;
		margin: auto;
		padding: 60rpx;
		// background-color: #A6A6A6;
		background-color: rgba(255, 255, 255, .7);
		border-radius: 30rpx;
	}
	
	button {
	  margin: 0;
	  padding: 0;
	  border: 0;
	  background: none;
	  font-size: 100%;
	  font-family: inherit;
	  font-weight: inherit;
	  color: inherit;
	  -webkit-appearance: none;
	  appearance: none;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	:focus {
	outline: 0;
	}
	
	.todo-title {
	font-size: 60rpx;
	margin-bottom: 40rpx;
	text-align: center;
	font-family: "yuan";
	font-weight: 700;
	}
	.todoapp {
	  margin: 0 auto;
	  padding: 30rpx;
	  width: 500rpx;
	  border-radius: 30rpx;
	  background: rgba(255, 255, 255, .9);
	  position: relative;
	  box-shadow: 0 2rpx 4rpx 0 rgba(0, 0, 0, 0.2), 0 25rpx 50rpx 0 rgba(0, 0, 0, 0.1);
	}
	
	.todoapp input::-webkit-input-placeholder {
	  font-style: italic;
	  font-weight: 300;
	  color: #e6e6e6;
	}
	
	.todoapp input::-moz-placeholder {
	  font-style: italic;
	  font-weight: 300;
	  color: #e6e6e6;
	}
	
	.todoapp input::input-placeholder {
	  font-style: italic;
	  font-weight: 300;
	  color: #e6e6e6;
	}
	.new-todo
	 {
	  position: relative;
	  margin: 0;
	  width: 80%;
	  font-size: 30rpx;
	  font-family: inherit;
	  font-weight: 550;
	  line-height: 1.4em;
	  border: 0;
	  color: inherit;
	  padding: 6rpx;
	  border: 1rpx solid #999;
	  box-shadow: inset 0 -1rpx 5rpx 0 rgba(0, 0, 0, 0.2);
	  // box-sizing: border-box;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.new-todo {
	  padding: 16rpx 16rpx 16rpx 70rpx;
	  border: none;
	  background: rgba(0, 0, 0, 0.003);
	  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
	}
	
	.itemMain {
	  position: relative;
	  margin-top: 15rpx;
	  .toggle-all {
	    position: absolute;
	    width: 1rpx;
	    height: 1rpx;
	    border: none; /* Mobile Safari */
	    left: 8rpx;
	    top: -75rpx;
	  }
	}
	
	.toggle-all {
	  + label:before {
	    content: "❯";
	    font-size: 22rpx;
	    color: #e6e6e6;
	    padding: 10rpx 27rpx 10rpx 27rpx;
	  }
	  &:checked {
	    + label:before {
	      color: #737373;
	    }
	  }
	}
	
	
	.todo-list {
	  margin: 0;
	  padding: 0;
	  list-style: none;
	  li {
	    position: relative;
	    font-size: 24rpx;
	    border-bottom: 1rpx solid #ededed;
	    &:last-child {
	      border-bottom: none;
	    }
	    &:hover {
	      .destroy {
	        display: block;
	      }
	    }
	    label {
	      word-break: break-all;
	      padding: 15rpx 15rpx 15rpx 60rpx;
	      display: block;
	      line-height: 1;
	      transition: color 0.4s;
	      text-align: left;
		  margin-left: 10rpx;
		  font-size: 28rpx;
	    }
	
	    .toggle {
	      text-align: center;
	      width: 40rpx;
	      /* auto, since non-WebKit browsers doesn't support input styling */
	      height: auto;
	      position: absolute;
	      top: 0;
	      bottom: 0;
	      left: 8rpx;
	      margin: auto 0;
	      border: none; /* Mobile Safari */
	      -webkit-appearance: none;
	      appearance: none;
	      + label {
	        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
	        background-repeat: no-repeat;
	        background-position: center left;
	      }
	      &:checked {
	        + label {
	          text-align: left;
	          background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
	        }
	      }
	    }
	    .destroy {
	      display: none;
	      position: absolute;
	      top: 0;
	      right: 20rpx;
	      bottom: 0;
	      width: 50rpx;
	      height: 40rpx;
	      margin: auto 0;
	      font-size: 30rpx;
	      color: #cc9a9a;
	      margin-bottom: 11rpx;
	      transition: color 0.2s ease-out;
	      &:hover {
	        color: #af5b5e;
	      }
	      &:after {
			font-size: 90rpx;
			line-height: 50rpx;
			font-weight: 700;
	        content: "×";
	      }
	    }
	    .edit {
	      display: none;
	    }
	  }
	  li.editing {
	    border-bottom: none;
	    padding: 0;
	    &:last-child {
	      margin-bottom: -1rpx;
	    }
	    .edit {
	      display: block;
	      width: calc(100% - 43rpx);
	      padding: 12rpx 16rpx;
	      margin: 0 0 0 43prx;
	    }
	    .view {
	      display: none;
	    }
	  }
	  li.completed {
	    label {
	      color: #d9d9d9;
	      text-decoration: line-through;
	      text-align: left;
	    }
	  }
	}


</style>