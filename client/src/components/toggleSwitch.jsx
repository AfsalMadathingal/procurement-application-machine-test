import { useState } from "react";
import styled from "styled-components";

import PropTypes from "prop-types";


const Switch = ({ isActive , onChange }) => {
  Switch.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const [active, setActive] = useState(isActive);

  const handleToggle = async () => {
    const newStatus = !active;
    setActive(newStatus);
    onChange();
  };

  return (
    <StyledWrapper isActive={active}>
      <label className="switch">
        <input type="checkbox" checked={active} onChange={handleToggle} />
        <div className="slider" />
        <div className="slider-card">
          <div className="slider-card-face slider-card-front" />
          <div className="slider-card-face slider-card-back" />
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    --circle-dim: 1.4em;
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => (props.isActive ? "#9ed99c" : "#f5aeae")};
    transition: 0.4s;
    border-radius: 30px;
  }

  .slider-card {
    position: absolute;
    height: var(--circle-dim);
    width: var(--circle-dim);
    border-radius: 20px;
    left: 0.3em;
    bottom: 0.3em;
    transition: 0.4s;
    pointer-events: none;
    transform: ${(props) =>
      props.isActive ? "translateX(1.5em)" : "translateX(0)"};
  }

  .slider-card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    perspective: 1000px;
    border-radius: 50%;
    transition: 0.4s transform;
  }

  .slider-card-front {
    background-color: #dc3535;
    transform: ${(props) =>
      props.isActive ? "rotateY(-180deg)" : "rotateY(0)"};
  }

  .slider-card-back {
    background-color: #379237;
    transform: ${(props) =>
      props.isActive ? "rotateY(0)" : "rotateY(180deg)"};
  }
`;

export default Switch;
