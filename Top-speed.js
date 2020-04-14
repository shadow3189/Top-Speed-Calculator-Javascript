class Vehicle
{
  constructor(t, p, r)
  {
    this.type = t;
    this.passengers = p;
    this.role = r;
  }
}

class Car extends Vehicle
{
  constructor(t, p, r, b, m, e, tr, d, w) 
  {
    super(t, p, r);
    this.brand = b;
    this.model = m;
    this.engine = e;
    this.trans = tr;
    this.diff = d;
    this.wheel = w;
  }
  specs()
  {
    console.log("Vehicle Manufacturer: " + this.brand);
    console.log("Vehicle Model: " + this.model);
    console.log("Vehicle Type: " + this.type);
    console.log("Max Passengers: " + this.passengers);
    console.log("Vehicle Role: " + this.role);
    this.engine.enginespecs();
    this.trans.transspecs();
    this.diff.diffspecs();
    this.wheel.wheelspecs();
  }
  topspeed()
  {
    this.gearedspeed = this.wheel.mphcalc(this.diff.diffrpm(this.trans.transrpm(this.engine.maxenginerpm())));
    console.log("At the max engine RPM of " + this.engine.maxrpm + ", in it's tallest gear, this vehicles is geared to travel at " + this.gearedspeed.toFixed(2) + " MPH.");
  }
}

class Jet extends Vehicle
{
  constructor(t, p, r, n, o, d, e) 
  {
    super(t, p, r);
    this.jetname = n;
    this.offense(o);
    this.defense(d);
    this.engine = e;
  }
}

class Engine
{
  constructor(f, d, c, r, w, p)
  {
    this.fuel = f;
    this.displacement = d;
    this.chambers = c;
    this.maxrpm = r;
    this.weight = w;
    this.maxpower = p;
    this.vi = this.maxpower/this.displacement;
    this.pwr = this.maxpower/this.weight;
    this.consumption = this.maxrpm/2 * this.displacement * 1/15.7;
  }
  enginespecs()
  {
    console.log("Engine Fuel Type: " + this.fuel);
    console.log("Engine Displacement (L): " + this.displacement);
    console.log("Engine Chamber Number: " + this.chambers);
    console.log("Engine Max RPM: " + this.maxrpm);
    console.log("Engine Weight (lbs): " + this.weight);
    console.log("Engine Max Power (HP): " + this.maxpower);
    console.log("Engine Volumetric Efficiency (HP/L): " + this.vi);
    console.log("Engine Power/Weight Ratio (HP/LB): " + this.pwr);
    console.log("Engine Max Idealized Fuel Consumption (L/Min): " + this.consumption);
  }
  maxenginerpm()
  {
    return this.maxrpm
  }
}

class Transmission
{
  constructor(n, fr)
  {
    this.gears = n;
    this.topratio = fr;
    this.osrpm = 0
  }
  transspecs()
  {
    console.log("Transmission Gear Number: " + this.gears);
    console.log("Transmission Top Gear Ratio: " + this.topratio);
  }
  transrpm(rpm)
  {
    this.osrpm = rpm/this.topratio;
    return this.osrpm;
  }
}

class Differential
{
  constructor(r)
  {
    this.ratio = r;
    this.orpm = 0;
  }
  diffspecs()
  {
    console.log("Differential Ratio: " + this.ratio);
  }
  diffrpm(drpm)
  {
    this.orpm = drpm/this.ratio;
    return this.orpm;
  }
}

class Wheel
{
  constructor(w, ar, rim)
  {
   this.rdiameter = rim;
   this.aratio = ar/100;
   this.width = w;
   this.thickness = this.width * this.aratio;
   this.odiameter = (this.thickness * 2 + this.rdiameter*25.4)/25.4;
   this.speed = 0;
  }
  wheelspecs()
  {
    console.log("Rim Diameter (in): " + this.rdiameter);
    console.log("Tire Width (mm): " + this.width);
    console.log("Tire Thickness (mm): " + this.thickness);
    console.log("Overall Wheel Diameter (in): " + this.odiameter);
  }
  mphcalc(rpm)
  {
    this.speed = this.odiameter*3.1415*rpm/63360*60;
    return this.speed;
  }
  kphcalc(rpm)
  {
    this.speed = this.odiameter*3.1415*rpm*60/1000000;
    console.log("Speed in KMH: " + this.speed);
    return this.speed;
  }
}

mydiff = new Differential(3.42);
LS7 = new Engine("gas", 7.0, 8, 7100, 454, 505);
T6060 = new Transmission(6, 0.5);
Star5 = new Wheel(275, 35, 18);
Z06 = new Car("land", 2, "transportation", "Chevrolet", "Corvette", LS7, T6060, mydiff, Star5);

console.log(Z06.specs());
console.log(Z06.topspeed());

