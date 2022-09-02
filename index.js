console.log('paisi ')
// ------------------------------------------------categories section ----------------------
const categories_section = document.getElementById('categories');
//  get the categpries names 
const get_categories = ()=> {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => set_categories(data.data.news_category))
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

        child.innerHTML = `
            <h6> ${category.category_name}</h6>    
        `
        console.log(child);
        categories_section.appendChild(child);
    });
}
get_categories();
// ------------------------------------------------news section ----------------------
const news_container = document.getElementById('news-container');

const get_any_news = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => show_news(data.data))
}

const show_news = (data) => {

    const news_container = document.getElementById('news-container');

    data.forEach(element => {
        console.log(element);
        const child = document.createElement('div');
        child.setAttribute('id', element._id);
        child.classList.add('col');

        // child.innerHTML = `
        //     <div class="card">
        //         <img src="${element.thumbnail_url}" class="card-img-top" alt="thumbnail">

        //         <div class="card-body">
        //             <h5 class="card-title">${element.title}</h5>
        //             <p class="card-text">${element.details}</p>
        //         </div>
        //     </div>
        // `
        child.innerHTML = `
            <div class="card mx-auto"  style="max-width: 900px;">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body my-3">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text text-secondary my-3">${element.details.slice(0,200)}...</p>
                        </div>

                        <div class="d-flex justify-content-around mb-0">
                            <div class="author d-flex align-items-center gap-3">
                                <div> <img src="${element.author.img}" class="img-thumbnail" alt="img" style="height:50px; width:50px; border-radius:50%" > </div>
                                <div class="d-flex flex-column align-items-center">
                                    <small>${element.author.name}</small>
                                    <small class="text-secondary">${element.author.published_date.slice(0,10)}</small>
                                </div>
                            </div>

                            <div class="views d-flex gap-2 align-items-center">
                                <i class="fa-solid fa-eye text-danger"></i>
                                <i><strong><small>${element.total_view}</small></strong></i>
                            </div>

                            <div class="stars d-flex align-items-center text-warning gap-1">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>

                            <div class="d-flex align-items-center">
                                <a class="btn text-primary" href=""><i class="fa-solid fa-arrow-right"></i></a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        `
        news_container.appendChild(child)
    });
}

get_any_news('01')