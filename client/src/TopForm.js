import React from 'react'

class TopForm extends React.Component {
  constructor(props) {
        super(props);
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.props.apiCall(value);
    }

  render () {
    return (
        <form className="form-inline mb-2">
            <div className = "form-group mx-auto">
              <label className="mr-2">Show me my top tracks for</label>
                <select className="form-control" onChange={this.handleChange}>
                  <option value="short_term">past 4 weeks</option>
                  <option value="medium_term">past 6 months</option>
                  <option value="long_term">all time</option>
                </select>
            </div>
        </form>
    );
  }
}

export default TopForm;
