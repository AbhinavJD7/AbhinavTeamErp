var app = angular.module('myApp', ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state("Login Page" , {
    url:"/Login",
    templateUrl : "login.html",
    controller : "LoginController"
  })
  .state("Home Page" , {
    url:"/Home",
    templateUrl : "Home.html",
    controller : "HomeController"
  })
 
  .state("Register Page" , {
    url:"/Register",
    templateUrl : "Register.html",
    controller : "RegisterController"
  })
  .state("Cart Page" , {
    url:"/cart",
    templateUrl : "cart.html",
    controller : "CartController"
  })
  .state("Admin Page" , {
    url:"/admin",
    templateUrl : "admin.html",
    controller : "AdminController"
  })
  .state("Contact Page" , {
    url: "/contactus" , 
    templateUrl : "contactus.html",
    controller : "ContactController"
  
  })
  .state("Product Page" , {
    url: "/product" , 
    templateUrl : "product.html",
    controller : "ProductController"
  })
  $urlRouterProvider.otherwise("/Home");    

}])
app.controller('HomeController' ,function($scope , $http ,$state){
    let slideIndex = 0;
      showSlides();

      function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
          slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000);
      }
      $scope.about =  function(){
        window.addEventListener('load' , function(){
          swal({
            title: 'Here you can find all the ESSENTIALS specially customised for you',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })

        })    
      }  
      // $scope.contact =  function(){
      //   Swal.fire({
      //       title: 'Phone Number :- +91 8318831415',
      //       showClass: {
      //         popup: 'animate__animated animate__fadeInDown'
      //       },
      //       hideClass: {
      //         popup: 'animate__animated animate__fadeOutUp'
      //       }
      //     })
      // }
})
app.controller('LoginController' ,function($scope , $http , $state){
    $scope.user = {};
    $scope.logindetail = function () {
      let data2 = {
        username: $scope.user.username,
        password: $scope.user.password,
      };
      console.log(data2);
      $http
        .post("https://10.21.85.102:8000/custom_login/", data2 ,{
          headers:{'Content-type': undefined},
          withCredentials: true
        })
        .then(function (response) {
          console.log("Success:" , response);
          console.log(response.data.authenticate_id);
          if(response)
          {
            alert("Store Manager Logged In");
            $state.go("Admin Page")
          }
        })
        .catch(function (error) {
          console.log("Error:", error);
        });
       
    };

})
app.controller('RegisterController' ,function($scope , $http ,$state){
    $scope.sendPost = function () {
        let data = {
          username : $scope.user.username,
          first_name: $scope.user.firstname,
          last_name : $scope.user.lastname,
          email: $scope.user.email,
          contact: $scope.user.contact,
          address: $scope.user.address,
          password: $scope.user.password,
          //confirm: $scope.user.confirmpassword
        };
        console.log(data);
        if(data.username==undefined || data.email==undefined || data.contact==undefined || data.address==undefined || data.password==undefined || data.first_name==undefined || data.last_name==undefined) 
        {
          alert("Please Fill All the Fields");
        }
        else
        {
          $http
         .post("https://10.21.85.102:8000/register/", JSON.stringify(data))
         .then(function (response) {
         console.log("Success:", response.data);
           alert("Details saved in Databas");
           $state.go("Login Page");
         })
         .catch(function (error) {
            console.log("Error:", error);
         });
      }; 
    }    
})
app.controller('CartController' , function($scope , $http ,$state){
    $scope.gocart = function(){

    }

})
app.controller('AdminController' , function($scope, $http , $state){
  // let newProd = {
  //   product_name : $scope.admin.prodname,
  //   product_id : $scope.admin.prodid,
  //   product_details : $scope.admin.proddetails,
  //   product_image : $scope.admin.prodimage
  // };
  // console.log(newProd);
  //         $http
  //         .post("http://10.21.81.228:8000/register/", JSON.stringify(newProd))
  //         .then(function (response) {
  //         console.log("Success:", response.data);
  //         })
  //         $scope.newProduct = {};
  //         $scope.product = [];

  //         var index_no={};
  $scope.formData = {
    name: '',
   file: null
 };
 
        $scope.addSection = function () {
          console.log("Add Section function reached")
          
        
          var files=[]
            var input = document.getElementById('imageInput');
            var file = input.files[0];
            
            var imageData = null; 
    
            if (file) {
                var reader = new FileReader();
    
                reader.onload = function(e) {
                    let imageData = e.target.result;
                    console.log("Image data:", imageData);
                };
           // let sourceimg =   reader.readAsDataURL(file)
              // console.log(file)
              // console.log(imageData);
              console.log($scope.formData.secname)
               var formData = new FormData();
                formData.append('sectionName', $scope.formData.secname);
                formData.append('sectionImage', file);
                console.log(formData);
              };
              $http.post('https://10.21.85.102:8000/add_section/' , formData ,{
                transformRequest : angular.identity,
                headers:{'Content-Type' : undefined},
                withCredentials: true
              })
                .then(function(response){
                  console.log(response);
                })
            .catch(function(error){
              console.log("Error Adding the products" , error);
            });
        };
        app.directive('fileUpload', function() {
          return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
               element.bind('change', function(event) {
              var file = event.target.files[0];
              scope.$apply(function() {
                ngModel.$setViewValue(file);
              });
              });
            }};
          })

          $http.get('https://10.21.85.102:8000/add_section/' , {
            withCredentials:true
          })
              .then(function(response){
                console.log(response);
                console.log(response.data)
                // secImg = []
                // secImgMap = [];
        
                // secImg = response.data;
                // console.log(secImg)
                // secImgMap = secImg.map(secImg => secImg.image);
                // console.log(secImgMap);
                $scope.sections = [];
                $scope.section = [];
                $scope.sections.push(response.data);
                var results = response.data;
                $scope.sections = results;
                console.log($scope.sections);
              })
              
                // for(i=0 ; i<secImg.length ; i++)
                // {
                //   secImgMap[i] = secImg[i].map(secImg.image);
                // }
                // for(i=0 ; i<secImgMap.length ; i++)
                // {
                //   console.log(secImgMap[i]);
                // }
                // var newSection = {
                //   imageSrc: 'placeholder-image.jpg'
                // };
                // $scope.sections.push(newSection);
          
              // $scope.updateSection = function(index) {
              //   var updatedImageSrc = prompt('Enter new image URL:');
              //   if (updatedImageSrc !== null) {
              //     $scope.sections[index].imageSrc = updatedImageSrc;
              //   }
              // };
          
              $scope.deleteSection = function(index) {
                var confirmDelete = confirm('Are you sure you want to delete this section?');
                if (confirmDelete) {
                  $scope.sections.splice(index, 1);
                }
                $http.post("https://10.21.85.102:8000/remove_section/"

                )
              };
                })

           
                // Add Pictures


                $scope.addProducts = function () {
                  console.log("Add Product function reached")
                  
                
                  var files=[]
                    var input = document.getElementById('productimageInput');
                    var file = input.files[0];
                    
                    var imageData = null; 
            
                    if (file) {
                        var reader = new FileReader();
            
                        reader.onload = function(e) {
                            let prodimageData = e.target.result;
                            console.log("Image data:", prodimageData);
                        };
                   // let sourceimg =   reader.readAsDataURL(file)
                      // console.log(file)
                      // console.log(imageData);
                      console.log($scope.formData.secname)
                       var formData = new FormData();
                        formData.append('productName', $scope.formData.prodname);
                        //formData.append('section_id', $scope.formData.secname);
                        formData.append('manufactureDate', $scope.formData.prodmanudate);
                        formData.append('expiryDate', $scope.formData.prodexpdate);
                        formData.append('ratePerUnit', $scope.formData.prodrate);
                        formData.append('productImage', file);
                        console.log(formData);
                      };
                      $http.post('https://10.21.85.102:8000/add_product/' , formData ,{
                        transformRequest : angular.identity,
                        headers:{'Content-Type' : undefined},
                        withCredentials: true
                      })
                        .then(function(response){
                          console.log(response);
                        })
                    .catch(function(error){
                      console.log("Error Adding the products" , error);
                    });
                };
                app.directive('fileUpload', function() {
                  return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: function(scope, element, attrs, ngModel) {
                       element.bind('change', function(event) {
                      var file = event.target.files[0];
                      scope.$apply(function() {
                        ngModel.$setViewValue(file);
                      });
                      });
                    }};
                  })

          //         $http.get('https://10.21.85.102:8000/add_section/' , {
          //   withCredentials:true
          // })
          //     .then(function(response){
          //       console.log(response);
          //       console.log(response.data)
          //       // secImg = []
          //       // secImgMap = [];
        
          //       // secImg = response.data;
          //       // console.log(secImg)
          //       // secImgMap = secImg.map(secImg => secImg.image);
          //       // console.log(secImgMap);
          //       $scope.sections = [];
          //       $scope.section = [];
          //       $scope.sections.push(response.data);
          //       var results = response.data;
          //       $scope.sections = results;
          //       console.log($scope.sections);
          //     })


app.controller('ContactController' , function($http , $scope , $state){
  let contactDetail = {
    first_name : $scope.contact.firstname,
    last_name : $scope.contact.lastname,
    email_contact : $scope.contact.email,
    comment_contact : $scope.contact.comment
  }
  console.log(contactDetail);
  if(data.first_name==undefined || data.last_name==undefined || data.email_contact==undefined || data.comment_contact==undefined) 
        {
          alert("Please Fill All the Fields");
        }
        else
        {
          $http
         .post("http://10.21.81.228:8000/register/", JSON.stringify(contactDetail))
         .then(function (response) {
         console.log("Success:", response.data);
           alert("Thank you for informing us. We will look into the matter as soon as possible");
           $state.go("Home Page");
         })
         .catch(function (error) {
            console.log("Error:", error);
         });
      }; 
    }) 
    app.controller('ProductController' , function($http , $scope , $state , $location){


    })
