<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"></img>
              </div>
              <div class="content">
                 <h2 class="name">{{food.name}}</h2>
                 <p class="desc">{{food.description}}</p>
                 <div class="extra">
                   <span class="count">月售{{food.sellCount}}份</span>
                   <span>好评率{{food.rating}}</span>
                 </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';

  const ERR_OK = 0;
  export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
      return {
          goods: []
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'invoice', 'special'];
        this.$http.get('/api/goods').then((response) => {
          response = response.body;
          if (response.errno === ERR_OK) {
              this.goods = response.data;
              this.$nextTick(() => {
                this._initScroll();
              });
          }
        });
    },
    methods: {
        _initScroll() {
            this.menuScroll = new Bscroll(this.$els.menuWrapper, {});

            this.foodScroll = new Bscroll(this.$els.foodsWrapper, {});
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixim.styl"

  .goods
    display: flex
    position: absolute
    width: 100%
    top: 174px
    bottom: 46px
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px;
      width: 80px
      background-colo: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 2px
          vertical-align: top
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          font-size: 12px
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 1px solid #d9dde1
        font-size: 12px
        color: rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex 1
          .name
            font-size: 14px
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            color: rgb(7,17,27)
          .desc, extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 18px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
</style>
