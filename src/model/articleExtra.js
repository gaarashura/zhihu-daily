/**
 * @description 保存文章额外信息的model
 */
import { observable, action, extendObservable } from "mobx";
class Extralist {
    @observable extras = {}
    @observable contents = {}
    @observable test = {
        str: 'aaaaaaaaaaaaaaaaaaa'
    }
    @action setExtra = (id, payload) => {
        extendObservable(
            this.extras, {
                [id]: payload
            }
        )
    }
    @action setContent = (id, payload) => {
        extendObservable(this.contents, {
            [id]: payload
        });
    }
    @action setStr = (payload) => {
        this.test.str = payload

    }
}

export default new Extralist();