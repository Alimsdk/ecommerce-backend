class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
    }

    search(){
       
        const keyword=this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
                // it means case insensitive
            }
        } : {}
        // console.log('etai keywrod pacchi',{...keyword});
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy={...this.queryStr}
        // console.log(queryCopy);
        // removing some fields for category
        const removeFields=['keyword','page','limit'];
        removeFields.forEach(key=>delete queryCopy[key]);
        // উপরের ৩টার যেকোনো ফিল্ড কুয়েরি করলে তা এখানে ডিলিট হয়ে যাবে
        // console.log(queryCopy);

        // -----------filter for price and rating------------

        let queryStr=JSON.stringify(queryCopy);
       
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)
            // console.log(JSON.parse(queryStr));
        this.query=this.query.find(JSON.parse(queryStr));
        // console.log(queryStr);

        return this;
    }

    pagination(resultPerPage){
       const currentPage=Number(this.queryStr.page) || 1;
       const skipProduct=resultPerPage*(currentPage-1);
       this.query=this.query.limit(resultPerPage).skip(skipProduct);
       return this
    }
}

module.exports=ApiFeatures;