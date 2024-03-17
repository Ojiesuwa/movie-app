import React, { useEffect, useState } from "react";
import "./AdminPriviledges-style.css";
import AdminPriviledge from "../components/AdminPriviledge";
import { useNavigate } from "react-router-dom";
import { verifyAdmin } from "../database/backend";
import { getUserId } from "../database/clientstorage";
import ModalNotification from "../parent-components/ModalNotification";

function AdminPriviledges() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    verifyAdmin(getUserId()).then((admin) => {
      setAdmin(admin);
    });
  }, []);

  return (
    <div className="admin-priviledges main">
      {!admin && (
        <ModalNotification
          modalIcon={"fa-regular fa-face-angry"}
          modalText={"You do not have admin priviledges"}
          modalActions={[
            {
              label: "Okay",
              action: () => {
                navigate("/Account");
              },
            },
          ]}
        />
      )}
      <div className="admin-priviledges-container">
        <AdminPriviledge
          label={"Add movie"}
          action={() => {
            navigate("/AddMovie");
          }}
          iconClass={"fa-solid fa-circle-plus"}
        />
        <AdminPriviledge
          label={"Edit movies"}
          action={() => {
            navigate("/");
          }}
          iconClass={"fa-solid fa-pen-to-square"}
        />
        <AdminPriviledge
          label={"View Users"}
          action={() => {
            navigate("/");
          }}
          iconClass={"fa-solid fa-user"}
        />
        <AdminPriviledge
          label={"View Stats"}
          action={() => {
            navigate("/");
          }}
          iconClass={"fa-solid fa-chart-pie"}
        />
      </div>
    </div>
  );
}

export default AdminPriviledges;
