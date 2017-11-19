import React, { PureComponent } from 'react'

import styled from 'styled-components'

const Form = styled.form``

class AddCard extends PureComponent {
  render() {
    return <Form onSubmit={this.props.onSubmit} />
  }
}

export default AddCard
