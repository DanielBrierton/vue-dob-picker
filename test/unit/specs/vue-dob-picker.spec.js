import vueUnitHelper from 'vue-unit-helper';
import VueDobPicker from '@/vue-dob-picker';


describe('vue-dob-picker.vue', () => {
  let vm;

  beforeEach(() => {
    vm = vueUnitHelper(VueDobPicker);
  });

  it('data', () => {
    expect(vm.date).to.equal(null);
    expect(vm.startingYear).to.equal((new Date()).getFullYear() - 100);
  });

  it('props', () => {
    expect(vm.locale).to.equal(navigator.language);
    expect(vm.monthFormat).to.equal('2-digit');
    expect(vm.proportions).to.deep.equal([1, 1, 2]);
  });

  describe('computed', () => {
    describe('day()', () => {
      it('get()', () => {
        // ARRANGE
        vm.date = new Date(2016, 1, 15, 10, 0, 0);

        // ASSERT
        expect(vm.day).to.equal(15);
      });

      it('set()', () => {
        // ARRANGE
        const initialDate = new Date(2016, 1, 1, 10, 0, 0);
        const expectedDate = new Date(2016, 1, 15, 10, 0, 0);
        vm.date = initialDate;

        // ACT
        vm.day = 15;

        // ASSERT
        expect(vm.date.toString()).to.equal(expectedDate.toString());
      });
    });

    describe('month()', () => {
      it('get()', () => {
        // ARRANGE
        vm.date = new Date(2016, 4, 1, 10, 0, 0);

        // ASSERT
        expect(vm.month).to.equal(5);
      });

      it('set()', () => {
        // ARRANGE
        const initialDate = new Date(2016, 1, 1, 10, 0, 0);
        const expectedDate = new Date(2016, 4, 1, 10, 0, 0);
        vm.date = initialDate;

        // ACT
        vm.month = 5;

        // ASSERT
        expect(vm.date.toString()).to.equal(expectedDate.toString());
      });
    });

    describe('year()', () => {
      it('get()', () => {
        // ARRANGE
        vm.date = new Date(2016, 1, 1, 10, 0, 0);

        // ASSERT
        expect(vm.year).to.equal(2016);
      });

      it('set()', () => {
        // ARRANGE
        const initialDate = new Date(2016, 1, 1, 10, 0, 0);
        const expectedDate = new Date(2014, 1, 1, 10, 0, 0);
        vm.date = initialDate;

        // ACT
        vm.year = 2014;

        // ASSERT
        expect(vm.date.toString()).to.equal(expectedDate.toString());
      });
    });

    describe('daysInMonth()', () => {
      it('should return days in month for given month', () => {
        // ARRANGE
        vm.date = new Date(2016, 4, 1, 10, 0, 0);

        // ASSERT
        expect(vm.daysInMonth).to.equal(31);

        // ARRANGE
        vm.date = new Date(2016, 5, 1, 10, 0, 0);

        // ASSERT
        expect(vm.daysInMonth).to.equal(30);
      });

      it('should return 28 days for February, even in leap years', () => {
        // ARRANGE
        vm.date = new Date(2016, 1, 1, 10, 0, 0);

        // ASSERT
        expect(vm.daysInMonth).to.equal(28);
      });
    });

    describe('isLeapYear()', () => {
      it('should return true for a leap year', () => {
        // ARRANGE
        vm.date = new Date(2016, 1, 1);

        // ASSERT
        expect(vm.isLeapYear).to.equal(true);
      });

      it('should return false for a non-leap year', () => {
        // ARRANGE
        vm.date = new Date(2014, 1, 1);

        // ASSERT
        expect(vm.isLeapYear).to.equal(false);
      });
    });
  });

  describe('watch', () => {
    describe('date()', () => {
      it('should emit an "input" event with the updated date', () => {
        // ARRANGE
        const emitStub = sinon.stub();
        vm.$emit = emitStub;
        vm.date = 'abc';

        // ACT
        vm.$watchers.date();

        // ASSERT
        expect(emitStub).to.have.been.calledWith('input', 'abc');
      });
    });
  });

  describe('methods', () => {
    describe('getDisplayedMonth()', () => {
      it('should display the month in short English', () => {
        // ARRANGE
        vm.monthFormat = 'short';
        vm.locale = 'en-us';

        // ACT + ASSERT
        expect(vm.getDisplayedMonth(0)).to.equal('Jan');
        expect(vm.getDisplayedMonth(1)).to.equal('Feb');
      });

      it('should display the month in long English', () => {
        // ARRANGE
        vm.monthFormat = 'long';
        vm.locale = 'en-us';

        // ACT + ASSERT
        expect(vm.getDisplayedMonth(0)).to.equal('January');
        expect(vm.getDisplayedMonth(1)).to.equal('February');
      });

      it('should display the month in two digit format in latin digits', () => {
        // ARRANGE
        vm.monthFormat = '2-digit';
        vm.locale = 'en-us';

        // ACT + ASSERT
        expect(vm.getDisplayedMonth(0)).to.equal('01');
        expect(vm.getDisplayedMonth(1)).to.equal('02');
      });

      it('should display the month in two digit format in arab digits', () => {
        // ARRANGE
        vm.monthFormat = '2-digit';
        vm.locale = 'ar-sa';

        // ACT + ASSERT
        expect(vm.getDisplayedMonth(0)).to.equal('٠١');
        expect(vm.getDisplayedMonth(1)).to.equal('٠٢');
      });

      it('should display the month in the long Chinese', () => {
        // ARRANGE
        vm.monthFormat = 'long';
        vm.locale = 'zh-cn';

        // ACT + ASSERT
        expect(vm.getDisplayedMonth(0)).to.equal('一月');
        expect(vm.getDisplayedMonth(1)).to.equal('二月');
      });
    });
  });

  describe('created()', () => {
    it('should set date to the value prop', () => {
      // ARRANGE
      vm.value = 'abc';

      // ACT
      vm.$lifecycleMethods.created();

      // ASSERT
      expect(vm.date).to.equal('abc');
    });
  });
});
