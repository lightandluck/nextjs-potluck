// ** FOR REFERENCE ONLY. WILL TURN INTO COMPONENT WITH BETTER PROP HANDLING

// import React, { Component } from 'react';

// class CloudinaryUploadWidget extends Component {
//   componentDidMount() {
//     var myWidget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: 'dkp0gitg9',
//         uploadPreset: 'potluck-photos',
//       },
//       (error, result) => {
//         if (!error && result && result.event === 'success') {
//           console.log('Done! Here is the image info: ', result.info);
//         }
//       }
//     );
//     document.getElementById('upload_widget').addEventListener(
//       'click',
//       function (e) {
//         e.preventDefault();
//         myWidget.open();
//       },
//       false
//     );
//   }

//   render() {
//     return (
//       <button id='upload_widget' className='btn btn-primary'>
//         Upload photo
//       </button>
//     );
//   }
// }

// export default CloudinaryUploadWidget;
