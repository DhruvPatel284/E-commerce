export const HomepageImage = () => {
    return (
      <div>
          <div className="h-[500px] flex justify-center items-center">
              <div className="relative flex justify-center items-center">
                  <img  className="h-[400px] w-[1200px] rounded-3xl" src="../images/homepage.jpg" alt="" />
                  <div className="text-4xl font-extrabold text-white absolute ">
                  Ship-Shop-Shou
                  </div>
              </div>
                  {/* <CardComponent titleComponent="" children="India's largest e-commerce Platform"/> */}
              </div>
      </div>
    )
  }
  export default HomepageImage;