import FirstComponent from './children/FirstComponent';
import {FirstBisComponent} from './children/FirstComponent';
import SecondComponent from './children/SecondComponent';
import ThirdComponent from './children/ThirdComponent';
import FourthComponent from './children/FourthComponent';
import LearningJavascript from './children/LearningJavaScript';

export default function LearningComponent() {
    return (
        <div className="LearningComponent">
            <FirstComponent/>
            <FirstBisComponent/>
            <SecondComponent/>
            <ThirdComponent/>
            <FourthComponent/>

            <LearningJavascript/>
        </div>
    )
}