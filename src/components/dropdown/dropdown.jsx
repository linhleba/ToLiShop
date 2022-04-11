import { React, useRef } from 'react';
import './dropdown.css';

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener('mousedown', (e) => {
    // toggle the content ref if click the toggle button
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle('active');
    } else {
      // if e.target is outside of content_ref section, closed this section
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove('active');
      }
    }
  });
};

const DropDown = (props) => {
  const dropdown_toggle_el = useRef(null);
  const dropdown_content_el = useRef(null);

  clickOutsideRef(dropdown_content_el, dropdown_toggle_el);
  return (
    <div className="dropdown">
      <button ref={dropdown_toggle_el} className="dropdown__toggle">
        {/* Check icon and badge */}
        {props.icon ? <i className={props.icon}></i> : ''}
        {props.badge ? (
          <span className="dropdown__badge">{props.badge}</span>
        ) : (
          ''
        )}
        {/* render for avatar and name of admin button */}
        {props.customToggle ? props.customToggle() : ''}
      </button>
      <div ref={dropdown_content_el} className="dropdown__content">
        {props.dataContent && props.renderItems
          ? props.dataContent.map((object, index) =>
              props.renderItems(object, index),
            )
          : ''}
        {props.renderFooter ? (
          <div className="dropdown__content-footer">{props.renderFooter()}</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default DropDown;
