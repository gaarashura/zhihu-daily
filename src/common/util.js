import axios from 'axios';
import urlConfig from './urlConfig';
const util = {}
axios.defaults.withCredentials = true;
/**
 * 拦截返回结果
 */
axios.interceptors.response.use(function (response) {
    console.log(response);
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

/**
 * 请求方法
 * @param url 路径
 * @param data 数据
 * @param type 方法
 * @param otherConfig 其他配置
 * @returns {AxiosPromise}
 */
util.ajax = ({
    url = '/',
    data = {},
    type = 'get'
} = {}, otherConfig = {}) => {
    var isFormData = (data instanceof FormData);
    url = /http/.test(url) ? url : (urlConfig.ajaxPath + url)
    var config = {
        method: type,
        url,
        [type == 'get' ? 'params' : 'data']: type == 'get' ? data : isFormData ? data : qs.stringify(data),
        headers: {
            'Content-Type': isFormData ? ' multipart/form-data' : 'application/x-www-form-urlencoded'
        },
        ...otherConfig
    }

    Object.assign(config, otherConfig)
    return axios(config)
};
//通用正则表达式
util.regexp = {
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
    number: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
    isZipCode: /^[0-9]{6}$/,
    phone: /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
    mobile: /^1[3|4|5|8|7]\d{9}$/,
    idCard: /^\d{15}(\d{2}[A-Za-z0-9])?$/
};

export default util;