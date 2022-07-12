# uni_shop
## 黑马优购小程序 uni-app Vue3

1. #### ==判断一个对象是不是空对象== ==简便的两个方法==

   ```js
   // 方法一
   const obj1 = {}
   Object.keys(obj1).length === 0 // true
   ```

   ```js
   // 方法二
   const obj2 = {}
   JSON.stringify(obj2) === "{}" // true
   ```

2. #### 关于==VueX==中 ==当state改变，但getters未改变==的解决方法

   > [Getter | Vuex (vuejs.org)](https://vuex.vuejs.org/zh/guide/getters.html#通过方法访问) Getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

   ```js
   // 此时getters的 totalCount不会随着 state的改变而改变
   getters:{
     // 返回选中商品的个数
     totalCount(state) {
       return state.cart.filter(g => g.goods_state === true).reduce((p, g) => p + g.goods_count, 0)
     }
   }
   ```
   
   ```js
   // 此时getters的 totalCount
   getters:{
     // 返回选中商品的个数
     totalCount:(state)=>()=>{
       return state.cart.filter(g => g.goods_state === true).reduce((p, g) => p + g.goods_count, 0)
     }
   }
   ```
   
   

