class Vehicle
{
  constructor(t, p, r)
  {
    let type = t;
    let passengers = p;
    let role = r;
    this.vehiclespecs = function()
    {
      console.log("Vehicle Type: " + type);
      console.log("Max Passengers: " + passengers);
      console.log("Vehicle Role: " + role);      
    }
  }
}

class Car extends Vehicle
{
  constructor(t, p, r, b, m, e, tr, d, w) 
  {
    super(t, p, r);
    let brand = b;
    let model = m;
    let engine = e;
    let trans = tr;
    let diff = d;
    let wheel = w;    
    this.specs = function()
    {
      console.log("Vehicle Manufacturer: " + brand);
      console.log("Vehicle Model: " + model);  
      this.vehiclespecs();
      engine.enginespecs();
      trans.transspecs();
      diff.diffspecs();
      wheel.wheelspecs();
    }
    this.topspeed = function()
    {
      let gearedspeed = wheel.mphcalc(diff.diffrpm(trans.transrpm(engine.maxenginerpm())));
      console.log("At the max engine RPM of " + engine.maxenginerpm() + ", in it's tallest gear, this vehicles is geared to travel at " + gearedspeed.toFixed(2) + " MPH.");
    }
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
    this.consumption = this.maxrpm/2 * this.displacement * 1.25 * 1/15.7;
  }
  enginespecs()
  {
    console.log("Engine Fuel Type: " + this.fuel);
    console.log("Engine Displacement (L): " + this.displacement);
    console.log("Engine Chamber Number: " + this.chambers);
    console.log("Engine Max RPM: " + this.maxrpm);
    console.log("Engine Weight (lbs): " + this.weight);
    console.log("Engine Max Power (HP): " + this.maxpower);
    console.log("Engine Volumetric Efficiency (HP/L): " + this.vi.toFixed(2));
    console.log("Engine Power/Weight Ratio (HP/LB): " + this.pwr.toFixed(2));
    console.log("Engine Max Idealized Fuel Consumption (g/Min): " + this.consumption.toFixed(2));
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
    console.log("Tire Thickness (mm): " + this.thickness.toFixed(2));
    console.log("Overall Wheel Diameter (in): " + this.odiameter.toFixed(2));
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

Z06.specs();
Z06.topspeed();
