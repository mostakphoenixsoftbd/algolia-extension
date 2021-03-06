import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Col from 'reactstrap/lib/Col';
import Divider from '@material-ui/core/Divider';
import Row from 'reactstrap/lib/Row';

import Metafield from './Metafield';
import { removeIndex, syncIndex } from '../../state/indices/actions';
import styles from './styles';

class ObjectType extends Component {
  constructor(props) {
    super(props);

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleSyncNowClick = this.handleSyncNowClick.bind(this);
  }

  handleRemoveClick(event) {
    event.preventDefault();

    const { dispatch, slug } = this.props;
    dispatch(removeIndex(slug));
  }

  handleSyncNowClick(event) {
    event.preventDefault();

    const { dispatch, slug } = this.props;
    dispatch(syncIndex(slug));
  }

  render() {
    const {
      classes,
      indices,
      metafields,
      options,
      slug,
      title,
    } = this.props;

    const isIndexed = !!indices[slug];

    return (
      <Fragment>
        <Row className={classes.heading} >
          <Col className={classes.col}>
            <h2 className={classes.h2}>{title}</h2>
          </Col>
          <Col className={classes.col} xs={{ position: 12 }}>
            {
              !isIndexed &&
              <Button
                className={classes.button}
                color="primary"
                onClick={this.handleSyncNowClick}
                variant="raised"
              >
                Sync Now
              </Button>
            }
            {
              isIndexed &&
              <Fragment>
                <Button
                  className={classes.button}
                  onClick={this.handleRemoveClick}
                  variant="flat"
                >
                  Remove
                </Button>
                <Button
                  className={classes.button}
                  color="primary"
                  onClick={this.handleSyncNowClick}
                  variant="raised"
                >
                  Re-Sync
                </Button>
              </Fragment>
            }
          </Col>
        </Row>
        <Row className={classes.metafields}>
          <Col>
            <Metafield
              cosmicKey="title"
              key="title"
              slug={slug}
              title="Title"
            />
            {
              metafields && metafields.map(metafield => (
                <Fragment key={metafield.key}>
                  <Metafield
                    {...metafield}
                    cosmicKey={metafield.key}
                    slug={slug}
                  />
                  <Divider light />
                </Fragment>
              ))
            }
            {
              options && options.content_editor &&
              <Metafield
                cosmicKey="content"
                key="content"
                slug={slug}
                title="Content"
              />
            }
          </Col>
        </Row>
      </Fragment>
    );
  }
}

ObjectType.defaultProps = {
  indices: {},
  metafields: [],
  options: {},
};

ObjectType.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  indices: PropTypes.object,
  metafields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
  })),
  options: PropTypes.shape({
    content_editor: PropTypes.number,
  }),
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  indices: state.indices && state.indices.data,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(ObjectType);
