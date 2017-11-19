import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FormInput = styled.div`
  display: flex;
  width: 100%;
  ${({ block }) =>
    block
      ? `
    flex-flow: column;
    align-items: flex-start;
    justify-content: flex-start;
    label {
      margin-bottom: .5em;
      font-size: .8rem;
      text-transform: uppercase;
    }
    input {
      background: transparent;
      border-radius: 0.4rem;
      border: 3px solid rgba(0,0,0,.6);
      color: #fff;
      padding: .5rem;
      width: 100%;
    }
  `
      : ''};
`

const Input = ({ block, id, onChange, value, type = 'text', label }) => (
  <FormInput block={block}>
    <label htmlFor={id}>{label}</label>
    <input id={id} type={type} value={value} onChange={onChange} />
  </FormInput>
)

Input.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default Input
