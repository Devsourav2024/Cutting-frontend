import React from "react";
import { Table } from "react-bootstrap";
function SheetMaterialsPage() {
  const materialRelation = [
    {
      material: "Wood",
      thickness: ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "8mm", "10mm"],
      color: "",
      finish: "",
      machineUsed: "CNC router",
    },
    {
      material: "Forex",
      thickness: ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "8mm", "10mm"],
      color: "",
      finish: "",
      machineUsed: "CNC router",
    },
    {
      material: "Acrylic",
      thickness: [
        "1mm",
        "2mm",
        "3mm",
        "4mm",
        "5mm",
        "6mm",
        "8mm",
        "10mm",
        "12mm",
        "15mm",
        "20mm",
        "25mm",
        "30mm",
      ],
      color: ["Clear", "Opal", "Opaque", "Black", "Red", "Green", "Blue", "Yellow"],
      finish: "",
      machineUsed: "CNC router",
    },
    {
      material: "MS",
      thickness: ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "8mm", "10mm"],
      color: "",
      finish: ["Mirror", "Brush"],
      machineUsed: "Lazer",
    },
    {
      material: "Aluminium",
      thickness: ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "8mm", "10mm"],
      color: "",
      finish: ["Brush", "Mirror", "Anodized"],
      machineUsed: "Lazer",
    },
    {
      material: "Stainless Steel",
      thickness: ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm", "8mm", "10mm"],
      color: "",
      finish: [
        "Brush - 316 Grade",
        "Mirror - 316 Grade",
        "Brush - 304 Grade",
        "Mirror - 304 Grade",
      ],
      machineUsed: "Lazer",
    },
    {
      material: "Copper",
      thickness: ["1mm", "2mm", "3mm"],
      color: "",
      finish: "",
      machineUsed: "Lazer",
    },
    {
      material: "Brass",
      thickness: ["1mm", "2mm", "3mm", "4mm", "5mm", "6mm"],
      color: "",
      finish: "",
      machineUsed: "Lazer",
    },
  ];

  const thickness = (item) => {
    if (item.length > 0) {
      return item?.map((thickness, index) => {
        return (
          <span key={index}>
            {thickness}
            {index < item.length - 1 && ", "}
          </span>
        );
      });
    } else {
      return;
    }
  };
  const color = (item) => {
    if (item?.length > 0) {
      return item?.map((color, index) => {
        return (
          <span key={index}>
            {color}
            {index < item.length - 1 && ", "}
          </span>
        );
      });
    } else {
      return;
    }
  };
  const finish = (item) => {
    if (item?.length > 0) {
      return item?.map((finish, index) => {
        return (
          <span key={index}>
            {finish}
            {index < item.length - 1 && ", "}
          </span>
        );
      });
    } else {
      return;
    }
  };

  return (
    <section className="privacy-sec sc-pt-50 sc-pb-50">
      <div className="container">
        <div className="row">
          <div className="col-md-12 tax-content">
            <h2>Sheet Metal Materials</h2>
            {/* <p>Content is coming soon!</p> */}
            <div className="d-flex justify-content-center col-112">
              <div className="tax-content-tables col-12">
                {/* Table */}
                <div class="table-responsive">
                  <Table className="green-head-table">
                    <thead className="bg-light">
                      <tr>
                        <th width="20%">Material</th>
                        <th>Thickness</th>
                        <th>Color</th>
                        <th>Finish</th>
                        <th width="20%">Machine Used</th>
                      </tr>
                    </thead>
                    <tbody>
                      {materialRelation?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.material}</td>
                            <td>{thickness(item.thickness)}</td>
                            <td>{color(item.color)}</td>
                            <td>{finish(item?.finish)}</td>
                            <td>{item?.machineUsed}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SheetMaterialsPage;
