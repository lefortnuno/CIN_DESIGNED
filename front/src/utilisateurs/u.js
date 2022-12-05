import { useEffect, useState } from "react";
import axios from "axios";

export default function Utilisateur() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      getUsers();
    }, []);
  
    function getUsers() {
      axios.get(`http://192.168.8.102:5015/api/utilisateur/`).then(function (response) {
        setUsers(response.data);
        console.log(response.data);
      });
    }

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const [isSucces, setSuccess] = useState(null);

  const submit = async () => {
    const formdata = new FormData();
    formdata.append("avatar", userInfo.file);

    axios
      .post("http://192.168.8.102:5015/api/utilisateur/", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // then print response status
        console.warn(res);
        if (res.data.success) {
          setSuccess("Image upload successfully");
          getUsers()
        }
      });
  };

  const [contenuTab, setContenuTab] = useState(true);

  return (
    <div className="container mr-60">
      <h3 className="text-white">
        React Image Upload And Preview Using Node Js
      </h3>

      <div className="formdesign">
        {isSucces !== null ? <h4> {isSucces} </h4> : null}

        <div className="form-row">
          <label className="text-white">Select Image :</label>
          <input
            type="file"
            className="form-control"
            name="upload_file"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={() => submit()}
          >
            SAVE
          </button>
        </div>
      </div>

      {userInfo.filepreview !== null ? (
        <img
          className="previewimg"
          src={userInfo.filepreview}
          alt="UploadImage"
          style={({ width: "150px" }, { height: "150px" })}
        />
      ) : null}

      <div className="container">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>image</th>
            </tr>
          </thead>
            <tbody>
              {contenuTab ? (
                users.map((user, key) => (
                  <tr key={key}>
                    <th scope="row">{user.id} </th>
                    <td> <img src={`/public_html/uploads/${user.image}`} style={{ width: '100px', height: '50px'}} /> </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>La liste</td>
                  <td>  est vide .... </td>
                </tr>
              )}
            </tbody>
        </table>
      </div>
    </div>
  );
}
