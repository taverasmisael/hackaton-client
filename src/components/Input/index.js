import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FormInput = styled.div`width: 100%;`

const Input = ({ id, onChange, value, type, label }) => (
  <FormInput>
    <label for={id}>{label}</label>
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
