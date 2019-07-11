import React from 'react'
import './Cards.css'
import { ReactComponent as FireIcon} from '../../../assets/images/card_vectors/fire.svg'
import { ReactComponent as MaxIcon} from '../../../assets/images/card_vectors/max.svg'
import { ReactComponent as AvgIcon} from '../../../assets/images/card_vectors/avg.svg'

function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + "h" + (mins < 10 ? "" : "");
    }

    if(mins > 0){
      ret += "" + mins + "m" + (secs < 10 ? "" : "");

    }
    if ( secs > 0){
      ret += "" + secs + "s";
    }
    return ret;
}

/*function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}*/

let cards = (props) =>(
      <div className="row">
        <div className="column">
          <div className="card">
          <i class="material-icons"><MaxIcon/></i>
          <span className = "stats">
              <h3 style = {{fontWeight: "bold"}}>{props.max}</h3>
              <p className = "title">Max Heart Rate</p>
            </span>
            
          </div>
        </div>

         <div className="column">
          <div className="card">
          <i class="material-icons"><AvgIcon/></i>
          <span className = "stats">
            <h3 style = {{fontWeight: "bold"}}>{props.mean}</h3>
            <p className = "title">Avg Heart Rate</p>
          </span>
          </div>
        </div>
      
        <div className="column">
          <div className="card">
          <i class="material-icons">timer</i>
          <span className = "stats">
            <h3 style = {{fontWeight: "bold"}}>{fancyTimeFormat(props.duration)}</h3>
            <p className = "title">Duration</p>
          </span>
          </div>
        </div>

        <div className="column">
          <div className="card">
          <i class="material-icons"><FireIcon/></i>
              <span className = "stats">
              <h3 style = {{fontWeight: "bold"}}>{props.calories}</h3>
              <p className = "title">Calories</p>
            </span>

          </div>
        </div>
      </div>
)

export default cards