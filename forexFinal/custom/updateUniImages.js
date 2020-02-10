var app = require('../server/server');

const universities = app.models.Universities;

// console.log(app.models.Universities);

//

"https://storage.googleapis.com/fa-web-assets/logos/university_of_tennessee_logo(1).jpg"
"https://static.yocket.in/images/universities/logos/tamu_logo.jpg"

function updateImages() {
  universities.findOne({where: {isImageUpdated: {exists: false}}}, function(err, data) {
    console.log("trying for ", data.imageUrl);
    if (data.imageUrl.indexOf("https://static.yocket.in") > -1) {
      var universityName = data.imageUrl.split("logos/")[1];
      var imageUrl = "https://storage.googleapis.com/fa-web-assets/logos/" + universityName;
      data.imageUrl = imageUrl;
      if (data.TopRecruiters === '') {
        data.TopRecruiters = "To be updated";
      }
      if (data.ranking === '') {
        data.ranking = "To be updated";
      }
      if (data.TuitionFee === '') {
        data.TuitionFee = "To be updated";
      }
      console.log(imageUrl);
    }
    data.isImageUpdated = true;
    universities.upsert(data, function(err, data){
      updateImages();
      console.log(err, data);
    })
  })
}

updateImages()
