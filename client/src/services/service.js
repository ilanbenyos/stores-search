


// import serverService from './service'
import axios from 'axios'


let baseUrl = 'http://localhost:3003';
if (process.env.NODE_ENV !== 'development') {
   baseUrl = '';
}

//=====================================================================
const uploadPhoto = msg => {
      console.log('service.uploadPhoto.msg:', msg);
        // return
        var req             = msg.req;
        var cloud_name      = 'ilanbeyos';
        var upload_preset   = 'vlwm5wec';

        let formData = new FormData();
      formData.append('file', req.file);
      formData.append('upload_preset', upload_preset);

       return axios({
        url: `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        method: 'POST',
        headers: {
            'Content-Type': undefined,
            'X-Requested-With': 'XMLHttpRequest'
        },
        data: formData,
      }).then( (res) => {
        if (res.status === 200){
          console.log('upload sucsess', res);
          var imageUrl = res.data.url;
          return imageUrl;
        }
        else{
          console.info('oops, something went wrong', res);
        }
      }).catch( (err) => {
        console.error(err);
      });
//===========  
  // return axios.get('http://localhost:3003/uploadPhoto', msg)
  //   .then(function (response) {
  //     console.log('service.uploadPhoto:', response.data);
  //     return response.data;
  //   })
}

//=====================================================================
const sendMsg = msg => {
      console.log('service.sendMsg1:', msg);
   return axios.post(baseUrl+'/data/sendMsg', msg)
   .then(function (response) {
      console.log('service.sendMsg2:', response.data);
      return response.data;
    })
}
//=====================================================================
//=====================================================================


export default {
  sendMsg,
  uploadPhoto,
}
