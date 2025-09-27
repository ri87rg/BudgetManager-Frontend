import { denominationValues } from "../enums/denominationsEnum"

import specimen_250 from "../assets/specimen_IQD_250.png"
import specimen_500 from "../assets/specimen_IQD_500.png"
import specimen_1000 from "../assets/specimen_IQD_1000.png"
import specimen_5000 from "../assets/specimen_IQD_5000.png"
import specimen_10000 from "../assets/specimen_IQD_10000.png"
import specimen_25000 from "../assets/specimen_IQD_25000.png"
import specimen_50000 from "../assets/specimen_IQD_50000.png"

export const denominationImages = {
  [denominationValues.IQD_250]: specimen_250,
  [denominationValues.IQD_500]: specimen_500,
  [denominationValues.IQD_1000]: specimen_1000,
  [denominationValues.IQD_5000]: specimen_5000,
  [denominationValues.IQD_10000]: specimen_10000,
  [denominationValues.IQD_25000]: specimen_25000,
  [denominationValues.IQD_50000]: specimen_50000,
}