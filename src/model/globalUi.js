/**
 * @description 全局UI组件控制
 */
import { observable,action } from "mobx";
class ui {
    @observable status={
        loading:false
    }
    @action setStatus=(field,payload)=>{
            this.status[field]=payload;
    }
}
export default new ui();