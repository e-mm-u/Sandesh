// console.log('paisi ')
// ------------------------------------------categories section ----------------------
const categories_section = document.getElementById('categories');
//  get the categpries names 
const get_categories = ()=> {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => set_categories(data.data.news_category))
        .catch(error => console.log(error))
};

// sort the categories name by alphabet
// const sort_categories = (news_category) =>{
//     let sorted_categories = [];
//     news_category.forEach(category => {
//         sorted_categories.push(category.category_name)       
//     });
//     sorted_categories = sorted_categories.sort();
    
//     set_categories(sorted_categories);
// }

// set the categories name in a div element 
const set_categories = (news_category) => {
    
    news_category.forEach(category => {

        const child = document.createElement('div');

        child.setAttribute('id', category.category_id);
        child.setAttribute('onclick', `clicked("${category.category_id}")`)

        child.innerHTML = `
            <h6> ${category.category_name}</h6>    
        `
        // console.log(child);
        categories_section.appendChild(child);
    });
}
get_categories();
// ------------------------------------------------news section ----------------------

const news_container = document.getElementById('news-container');

const get_any_news = async(id) => {

    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const data = await res.json();
        show_news(data);
    }
    catch(error){
        console.log(error);
    }
    
}

const show_news = (d) => {

    const data = d.data;
    const len = data.length;
    // show not available page -----------
    if(len === 0){
        document.getElementById('NotFound').classList.remove('d-none');
    }else{
        document.getElementById('NotFound').classList.add('d-none');
    }

    // functionality to show how many results are found-------------
    quantity(len);

    news_container.innerHTML = ` `;

    data.forEach(element => {
        // console.log(element);
        const child = document.createElement('div');
        // child.setAttribute('id', element._id);
        child.classList.add('col');

        child.innerHTML = `
            <div class="card mx-auto"  style="max-width: 900px;">
                <div class="row g-0">
                    <div class="col col-12 col-md-4">
                        <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col col-12 col-md-8">
                        <div class="card-body my-3">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text text-secondary my-3">${element.details.slice(0,200)}...</p>
                        </div>

                        <div class="d-flex flex-wrap gap-3 justify-content-around mb-0">
                            <div class="author d-flex align-items-center gap-3">
                                <div> <img src="${element.author.img}" class="img-thumbnail" alt="img" style="height:50px; width:50px; border-radius:50%" > </div>
                                <div class="d-flex flex-column align-items-center">
                                    <small>${element.author.name ? element.author.name : 'Not available'}</small>
                                    <small class="text-secondary">${element.author.published_date? element.author.published_date.slice(0,10): 'Unavailable'}</small>
                                </div>
                            </div>

                            <div class="views d-flex gap-2 align-items-center">
                                <i class="fa-solid fa-eye text-danger"></i>
                                <i><strong><small>${element.total_view ? element.total_view : 'Not available'}</small></strong></i>
                            </div>

                            <div class="stars d-flex align-items-center text-warning gap-1">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>

                            <div class="d-flex align-items-center">
                                <a class="btn text-primary" data-bs-toggle='modal' data-bs-target='#id${element._id}'><i class="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id='id${element._id}' tabindex="-1" aria-labelledby='${element._id}Label' aria-hidden="true">
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${element.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                
                                <div class="d-flex justify-content-end align-items-center gap-2">
                                    <i class="fa-solid fa-eye text-danger"></i>
                                    <i><small>${element.total_view ? element.total_view : 'Not available'}</small></i>
                                    <i class="fa-solid fa-star text-warning"> </i>
                                    <i>${element.rating.number}</i>
                                    <i> ${element.rating.badge} </i>
                                </div>

                                <div class="row row-cols-1 mx-auto">
                                    <img src="${element.image_url}" alt="img">
                                </div>
                                <hr>
                                
                                <div class="row row-cols-2 mx-auto">
                                    <div>Author : ${element.author.name ? element.author.name : 'Not available'}</div>
                                    <div>Published : ${element.author.published_date ? element.author.published_date : 'Unavailable'}</div>
                                </div>
                                <hr>

                                <div>
                                    <p>${element.details}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        // console.log(child)
        news_container.appendChild(child)
    });

    // spin loader stops 
    spinloader(false);
}

// ---------- show quantity here ---------------
function quantity(len){
    document.getElementById('quantity').innerHTML = `
        <div class="mx-auto">
            <p> ${len} results available </p>
        </div>
    `
}

//------------spin loader functionalities --------
const spinner = document.getElementById('spinner');
const spinloader = isloading => {

    if (isloading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }

}

// -------------------------------event listen on click to show news ------------

function clicked(id){
    // console.log(id);
    // spin loader starts here
    spinloader(true);
    
    get_any_news(id);
}

get_any_news('01');
