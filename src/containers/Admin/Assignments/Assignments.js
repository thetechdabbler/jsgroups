import React from 'react'
import { Link } from 'react-router-dom';

const Assignments = (props) => {
    return (
        <div className="container mt-5">
            <div className="row mb-2">
                <div class="d-flex justify-content-start col-md-auto p-0">
                    <Link to="/home/assignments/create" className="btn btn-primary btn-md">Add Assignments</Link>
                </div>
            </div>
            <div className="row">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Assignments;
