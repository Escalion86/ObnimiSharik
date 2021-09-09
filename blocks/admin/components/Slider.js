import { Slider as MaterialSlider } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'

const StyledSlider = withStyles({
  root: {
    color: 'currentColor',
    // height: 20,
    padding: '50px 0 20px 0',
    marginLeft: -6,
    // marginRight: 14,
    // marginTop: 8,
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
  },
  valueLabel: {
    left: 'calc(-50% + 6px)',
    // '& *': {
    //   // background: 'transparent',
    //   // color: 'currentColor',
    //   marginTop: 10,
    // },
  },
  active: {},
  track: {
    height: 16,
  },
  rail: {
    // color: 'white',
    opacity: 0.3,
    height: 16,
    border: '2px solid currentColor',
    // marginTop: -6,
  },
})(MaterialSlider)

const Slider = (props) => (
  <div className="w-full px-6 text-primary">
    <StyledSlider {...props} />
  </div>
)

export default Slider
