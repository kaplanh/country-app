# Countries App

**How does my project look**


![countries](https://github.com/kaplanh/country-app/assets/101884444/c7be50a1-9c75-4483-bb90-8d5a62e409a5)

[Live link!](https://kaplanh.github.io/country-app/)


 **What's used in this app ?** | **How to run ?** | **Author** |
|----------|---------|------------
|Api-Server | Once you clone the project|[Take a look at my portfolio](https://kaplanh.github.io/Portfolio_with_CssFlex/)|
|Html| open index.html with Go Live in vs cod|[Visit me on Linkedin](https://www.linkedin.com/in/kaplan-h/)|
|Css||   
|Javascript |  |
|Bootstrap ||   

**What is this project about ?**
- In this project user can get any current country detail from certain api-server and can find a link which takes the user google map.



## Project Skeleton 

```
Synchronous-Asynchronous-Programming(folder)
|
|----readme.md                        
|----index.html
|----img (folder)
|----style.css
|----1-intro.js
|----2-promise.js
|----3-fetchAPI.js
|----4-async-await.js
```

### At the end of the project, the following topics are to be covered;

- API's
  - [Github followers API](https://api.github.com/users)
  - [newsAPI](https://newsapi.org/)
- HTML
- CSS
 - Nested CSS
     ~~~css
          .card {
              & img {
                  transition: 0.5s;
              }
          
              & img:hover {
                  rotate: 10deg;
                  scale: 1.02;
              }
              & .btn {
                  transition: scale 0.2s;
              }
              & .btn:hover {
                  scale: 1.03;
              }
          }
     ~~~
  
  - JS
     - senkron programing
       ```
       console.log("Hello")
       alert("Blocked") //? Blocking
       console.time("gecikme")
       delay(4000) //? blocking code - senkron
       console.timeEnd("gecikme")
       console.log("hi")
       ```
      - Asenkron (setTimeout()) programing
          ```
           setTimeout(() => {
          console.log("I am fine")
          console.timeEnd("timer")
          }, 1000)
          
          setTimeout(() => {
             console.log("Whats up?")
              console.timeEnd("timer")
           }, 1000)
          
           console.log("start")
           console.time("timer")
             ```
        -  Asenkron (setInterval, clearInterval) programing
             ```
            /? setInterval periyodik zaman araligi oluşturmak icin kullanilabilir.
            //? clearInterval yardımıyla surekli devam interval pasif hale getirilir.
            let count = 0
            const sec1 = setInterval(() => {
              console.log(++count)
              if (count > 9) {
                clearInterval(sec1)
               }
            }, 1000)
              ```
       - Callback Hell (nested ve birbirine bagli callback'ler)
   
              ```
                  setTimeout(() => {
                  console.log("john:Hi");
                  setTimeout(() => {
                      console.log("Sarah: Hello");
                      setTimeout(() => {
                          console.log("John: How Are you?");
                          setTimeout(() => {
                              console.log("Sarah:Fine and you?");
                          }, 1000);
                      }, 1000);
                  }, 1000);
              }, 1000);
              ```
       - Promise()
         
             ```
                   const networkReq = new Promise((resolve, reject) => {
                      const data = { a: 1, b: 2 };
                      const success = Math.floor(Math.random() * 5); //? (0,1,2,3,4)
                      if (success) {
                          console.log("Data fetched");
                          resolve(data);
                      } else {
                          reject("Ohh no there is network error");
                      }
                  });              
              networkReq
                  .then((response) => console.log(response))
                  .then(() => console.log("2. then"))
                  .catch((err) => document.write(err))
                  .finally(() => console.log("Her zaman calisir"));
              ```
      - fetch API
              ```   

                  let veri = "";
                   fetch("https://api.github.com/users")
                     .then((res) => {
                         //! Error handling
                         if (!res.ok) {
                             throw new Error("Something went wrong", res.status);
                             // console.log("Something went wrong")
                         } else {
                             return res.json();
                         }
                     })
                     .then((data) => {
                         // veri = data
                         // console.log(veri)
                         showUsers(data);
                     })
                     .catch((err) => {
                         console.log(err);
                         const usersDiv = document.getElementById("users");
                         usersDiv.innerHTML = `<h2 class="text-warning">${err}</h2>`;
                     });
                 
                 // console.log(veri)
                 
                 const showUsers = (users) => {
                     console.log(users);
                     const usersDiv = document.getElementById("users");
                 
                     users.forEach((user) => {
                         // console.log(user.login)
                         usersDiv.innerHTML += `
                          <div class="card col" style="width: 15rem;">
                             <img src="${user.avatar_url}" class="card-img-top img-thumbnail" alt="...">
                 
                            <div class="card-body">
                 
                             <h5 class="card-title">${user.login}</h5>
                             <p class="card-text">${user.type + ' ' + user.id}</p>
                             <a href="${user.html_url}" class="btn btn-primary">Go somewhere</a>
                 
                            </div>
                 
                        </div>
                     `;
                     });
                 };
               ```
        
       - async-await
           ```
            const getNews = async () => {
                     const API_KEY = "2108f1dba8114b89b4a326fc6f71a5a8";
                     const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
                     try {
                         const res = await fetch(URL);
                         // console.log(res);
                         //?Error handling
                         if (!res.ok) {
                             throw new Error("News can not be fetched");
                         }
                         const data = await res.json();
                         renderNews(data.articles);
                     } catch (err) {
                         // console.log(error);
                         renderError(err);
                     }
                   };
                   const renderNews = (news) => {
                       const newsDiv = document.getElementById("news");

                      news.map((item) => {
                          const { title, content, url, urlToImage } = item; //? destructure
                          newsDiv.innerHTML += `
                      <div class="col-sm-6 col-md-4 col-lg-3">
                          <div class="card">
                              <img src="${urlToImage}" class="card-img-top img-thumbnail" alt="...">
                              <div class="card-body">
                                  <h5 class="card-title">${title}</h5>
                                  <p class="card-text">${content}</p>
                                  <a href="${url}" target="_blank" class="btn btn-danger">Go Detail</a>
                              </div>
                          </div>
                      </div>
           
                               `;
                               });
                           };
                   const renderError = (err) => {
                       const newsDiv = document.getElementById("news");
                       newsDiv.innerHTML = `
                       <h3>${err}</h3>
                       <img src="./img/404.png" alt="404" />
                     `;
                   };
                   
                   window.addEventListener("load", () => {
                       getNews();
                   });```
      
  
    - DOM Manipulations
      - innerHTML
      - innerText
      - textContent
     
    - DOM Selectors
    
    - Events
        - click
        - load
 
 
  
    - Array Methods
    - forEach() &  map()

     ```
             const showUsers = (users) => {
              console.log(users);
              const usersDiv = document.getElementById("users");
          
              users.forEach((user) => {
                  // console.log(user.login)
                  usersDiv.innerHTML += `
                   <div class="card col" style="width: 15rem;">
                      <img src="${user.avatar_url}" class="card-img-top img-thumbnail" alt="...">
          
                     <div class="card-body">
          
                      <h5 class="card-title">${user.login}</h5>
                      <p class="card-text">${user.type + ' ' + user.id}</p>
                      <a href="${user.html_url}" class="btn btn-primary">Go somewhere</a>
          
                     </div>
          
                 </div>
              `;
              });
          };
       ```





     ```
            const renderNews = (news) => {
            const newsDiv = document.getElementById("news");
        
            news.map((item) => {
                const { title, content, url, urlToImage } = item; //? destructure
                newsDiv.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card">
                    <img src="${urlToImage}" class="card-img-top img-thumbnail" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${content}</p>
                        <a href="${url}" target="_blank" class="btn btn-danger">Go Detail</a>
                    </div>
                </div>
            </div>
           
            `;
            });
        };
            });
    ```
 


## Feedback and Collaboration
I value your feedback and suggestions. If you have any comments, questions, or ideas for improvement regarding this project or any of my other projects, please don't hesitate to reach out.
I'm always open to collaboration and welcome the opportunity to work on exciting projects together.
Thank you for visiting my project. I hope you have a wonderful experience exploring it, and I look forward to connecting with you soon!



<p align="center"> ⌛<strong> Happy Coding </strong> ✍ </p>






























<div id="user-content-toc">
  <ul align="left">
    <summary><h1 style="display: inline-block">Rest-Countries App</h1></summary>
  </ul>
</div>

<table>
   <thead>
        <tr>
            <th>What's used in this app ?</th>
            <th>How to run ?</th>
            <th>Author</th>
        </tr>
    </thead>
  <tbody>
  <tr>
    <td> 
      <li> Javascript  
      <li> Css
      <li> Bootstrap
      <li> Html
      <li> Api-Server
    </td>
    <td>  <h4>Once you clone the project</h4>  
      
 1) open index.html with Go Live in vs code


   </td>
    <td> <li> <a href="" target="_blank">Take a look at my other projects</a> <li> <a href="https://www.linkedin.com/in/kaplan-h/" target="_blank">Visit me on Linkedin</a> 
  </tr>
  <tr>
    <td colspan="3"><h3>What is this project about ?</h3> 
<p>
In this project user can get any current country detail from certain api-server and can find a link which takes the user google map.
</p>
    </td>
  </tr>
      </tbody>
</table>



<div id="user-content-toc">
  <ul align="left">
    <summary><h2>How does my project look</h2></summary>
  </ul>
</div>


[Live Link](https://kaplanh.github.io/country-app/)

![countries](https://github.com/AliDurul/Rest-Countries/assets/80897590/63ab9153-6477-443d-a1bd-5c0f07a088f8)

<div id="user-content-toc">
  <ul align="left">
    <summary><h2>Feedback and Collaboration</h2></summary>
  </ul>
</div>
I value your feedback and suggestions. If you have any comments, questions, or ideas for improvement regarding this project or any of my other projects, please don't hesitate to reach out.<br>
I'm always open to collaboration and welcome the opportunity to work on exciting projects together.<br>
Thank you for visiting my project. I hope you have a wonderful experience exploring it, and I look forward to connecting with you soon!


<p align="center"> ⌛<strong> Happy Coding </strong> ✍ </p>



# Checkout_Page


![checkoutpage](https://github.com/kaplanh/Checkout_Page/assets/101884444/5cfce62d-d646-4ca7-8f0c-d7a58be1d7b3)


[Click Me!](https://kaplanh.github.io/Checkout_Page/)

## Description

The project aims to create a Checkout App using JS and Bootstrap.

## Problem Statement

- Your company has recently started on a project that aims to create a Checkout Page. So you and your colleagues have started to work on the project.

## Project Skeleton 

```
Checkout Page (folder)
|
|----readme.md                        
|----index.html
|----checkout.js
|----img (folder)
|----css (folder)
     |----index.css
     |----checkout.css
     |----universal.css

``` 


### At the end of the project, the following topics are to be covered;

- HTML
  - select
  - strong
  - del
   ```

 - CSS
 - Nested CSS
 - text-decoration: line-through
 ```
    .nav__list--btn {
    color: orangered;
    font-size: 14px;
    cursor: pointer;

    & i:hover {
        color: white;
        border-radius: 50%;
        background-color: #ff7623;
    }
    }

.line-through {
    text-decoration: line-through;
}
   
   ```

  
  
- JS
  - DOM Manipulations
    - innerHTML
    - innerText
    - textContent
     
  - DOM Selectors
  - querySelector
  - querySelectorAll
  - const productList = document.querySelector("div.main__product-painel"); //?basina div yazarak belirtirsek performans acisindan daha hizli olur
    
  - Events
    - click
    - load
  
  -e.target & e.currentTarget
    ```
         e.currentTarget.firstElementChild.innerText = "My Cart";
        //? NOT:e.target tiklanan elementi verirken e.currentTarget sabittir ve addEventListener in tanimlandigi elemandir burda navbarList  ve daha hizlidir
    ```
  - Capturing & Bubbling
  - DOM Traversing
    - nextElementSibling
    - e.target.closest(".main__product-info"
    - if (e.target.classList.contains("fa-plus"))
    - e.target.previousElementSibling.innerText++;
    - firstElementChild
    - children
   
  - localStorage & sessionStorage
 
  
  - Array Methods
  - forEach() & reduce()
     ```
    productTotalPriceDivs.forEach(eachProductTotalPriceDiv => {
        subtotal += parseFloat(eachProductTotalPriceDiv.innerText)
    });
    ```
 
      ```
    reduce()
    const subTotalAlternatif = [...productPriceDivs]; //reduce icin array a dönüstürmeliyiz
    let subtotal = subTotalAlternatif.reduce((acc, curr) => {
        return acc + parseFloat(curr.innerText); //parseFloat  stringten float yapar
    }, 0);

    ```
  
  - parseFloat
    ```
    const taxPrice = parseFloat(subtotal * localStorage.getItem("taxRate")); parseFloat  stringten float yapar

    ```

  
  - if else - if - else  conditions
  - Ternary
    ```
    let shipping = (subtotal > 0 ? parseFloat(localStorage.getItem("shippingPrice")) : 0);

    ```
 
 
     

  - String Methods( toFixed() )
   ```
   productTotalPriceDiv.innerText = (productQuantity * productPrice).toFixed(2);
  ```

    

### At the end of the project, developers will be able to;

- improve coding skills within HTML, CSS and JS 

- use git commands (push, pull, commit, add etc.) and Github as a Version Control System.


## Notes

- You can use HTML, CSS and JS to complete this project.









