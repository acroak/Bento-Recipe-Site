const NotFound = () => {

    return (
        <div className="py-5">
            <h2> 404 </h2>
            <h4>Page Not Found</h4>
            <img src= {process.env.PUBLIC_URL + "/images/404-page.jpg "} alt="Uh oh page not found" style={{width:300,}}/>
        </div>
    )
}

export default NotFound;