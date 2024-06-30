import FirstComponent from './FirstComponent'
import SecondComponent from './SecondComponent'
import ThirdComponent from './ThirdComponent'
import {FourthComponent} from './FirstComponent'
import LearningJavaScript from './LearningJavaScript'

export default function LearningComponent() {
    return (
      <div className="App">
        <LearningJavaScript/>
        <FirstComponent/>
        <SecondComponent/>
        <ThirdComponent/>
        <FourthComponent/>
      </div>
    );
  }

