import Axios from 'axios';
import React, { useState } from 'react';
import Spinner from '../../utilComponents/Spinner/Spinner';

const CategoryCreator = (props) => {
    const [category, setCategory] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    const onChangeCategory = (e) => {
        const { value } = e.target;
        setCategory(value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        createCategory(category);
    }

    const createCategory = (category) => {
        setShowLoader(true);
        Axios.post('https://react-burger-app-ffa49.firebaseio.com/categories.json', { category })
            .then((data) => {
                setShowLoader(false);
                setCategory("");
            }).catch((error) => {
                setShowLoader(false);
                alert(error);
            });
    }

    const loader = showLoader ? <Spinner/> : null;
    return (
        <>
            {loader}
            <div className="container mt-5">
                <h2>Add Category</h2>
                <form onSubmit={onSubmit}>
                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <input type="text" name="category" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChangeCategory} />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default CategoryCreator;