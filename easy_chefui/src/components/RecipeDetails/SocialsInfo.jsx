import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import Rating from "../Card/Rating";
import useAxios from "../Auth/AuthAxios";
import { useState } from "react";

function SocialInfo({post_id, likes, favorites, setReRender}) {
    // const [likes, setLikes] = useState(0);
    // const [favorites, setFavorites] = useState(0);

    // const updateSocials = async () => {
    //     const response = await api.get(
    //         `http://127.0.0.1:8000/posts/${post_id}/like/all/`
    //     );
    //     if (response.status === 200) {
    //     setLikes(response.data.count);
    //     }

    //     const res = await api.get(
    //         `http://127.0.0.1:8000/posts/${post_id}/favorites/all/`
    //       );
    //     if (res.status === 200) {
    //     setFavorites(res.data.count);
    //     }
    // };
    
    return (
        <MDBContainer className="d-inline-flex text-center align-items-center ">
            <div className="px-2 square border-end pt-3 d-flex align-items-center" style={{maxHeight:'10px'}}>
                <Rating  post_id={post_id}/>
            </div>
            <div className="px-2 square border-end pt-3 d-flex align-items-center"
            style={{maxHeight:'10px'}}>
                <p>{likes} Likes</p>
            </div>
            <div className="px-2 d-flex align-items-center pt-3"
            style={{maxHeight:'0px'}}>
                <p>{favorites} Favorites</p>
            </div>
            
        </MDBContainer>
    );
}

export default SocialInfo;