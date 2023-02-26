// функцию checkServerResponse мы добавили в класс Api 

// export function checkServerResponse(res){
//     if(res.ok){
//         return res.json();
//     }
//     return Promise.reject(res.status);
// }

export function renderError(err){
    console.log(err);
  }; 