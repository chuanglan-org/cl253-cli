import React from "react";
export default (props) => {
  return (
    <div className="box">
      <div className="box-title">
        <div className="title_name">{props.title}</div>
      </div>
      <div className="box-content">{props.children}</div>
    </div>
  );
};
