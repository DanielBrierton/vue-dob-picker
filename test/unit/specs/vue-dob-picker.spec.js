import vueUnitHelper from 'vue-unit-helper';
import VueDobPicker from '@/vue-dob-picker';


describe('vue-dob-picker.vue', () => {
  let vm;

  beforeEach(() => {
    vm = vueUnitHelper(VueDobPicker);
  });

  it('data', () => {
    expect(vm.date).to.equal(null);
    expect(vm.currentYear).to.equal((new Date()).getFullYear());
  });

  it('props', () => {
    expect(vm.locale).to.equal(navigator.language);
    expect(vm.monthFormat).to.equal('2-digit');
    expect(vm.labels).to.deep.equal(['Date', 'Month', 'Year']);
    expect(vm.proportions).to.deep.equal([1, 1, 2]);
  });

  describe('computed', () => {
    describe('date()', () => {
      it('should return null if day is falsey', () => {
        // ARRANGE
        vm.day = null;
        vm.month = 5;
        vm.year = 1990;

        // ASSERT
        expect(vm.date).to.equal(null);
      });

      it('should return null if month is falsey', () => {
        // ARRANGE
        vm.day = 5;
        vm.month = null;
        vm.year = 1990;

        // ASSERT
        expect(vm.date).to.equal(null);
      });

      it('should return null if year is falsey', () => {
        // ARRANGE
        vm.day = 5;
        vm.month = 5;
        vm.year = null;

        // ASSERT
        expect(vm.date).to.equal(null);
      });

      it('should return a date if day, month and year are defined', () => {
        // ARRANGE
        vm.day = 5;
        vm.month = 5;
        vm.year = 1990;

        // ASSERT
        expect(vm.date.toString()).to.equal((new Date(1990, 5, 5, 0, 0, 0, 0)).toString());
      });

      it('should set day, month and year when value is set', () => {
        // ARRANGE
        vm.date = new Date(1990, 5, 5, 0, 0, 0, 0);

        // ASSERT
        expect(vm.day).to.equal(5);
        expect(vm.month).to.equal(5);
        expect(vm.year).to.equal(1990);
      });
    });

    describe('daysInMonth()', () => {
      it('should return days in month for given month', () => {
        // ARRANGE
        vm.month = 4;

        // ASSERT
        expect(vm.daysInMonth).to.equal(31);

        // ARRANGE
        vm.month = 5;

        // ASSERT
        expect(vm.daysInMonth).to.equal(30);
      });

      it('should return 28 days for February, even in leap years', () => {
        // ARRANGE
        vm.month = 1;

        // ASSERT
        expect(vm.daysInMonth).to.equal(28);
      });

      it('should return 31 when no month is specified', () => {
        // ARRANGE
        vm.month = null;

        expect(vm.daysInMonth).to.equal(31);
      });
    });

    describe('isLeapYear()', () => {
      it('should return true for a leap year', () => {
        // ARRANGE
        vm.year = 2016;

        // ASSERT
        expect(vm.isLeapYear).to.equal(true);
      });

      it('should return false for a non-leap year', () => {
        // ARRANGE
        vm.year = 2014;

        // ASSERT
        expect(vm.isLeapYear).to.equal(false);
      });
    });
  });

  describe('watch', () => {
    describe('date()', () => {
      it('should emit an "input" event with the updated date', () => {
        // ARRANGE
        const mockDate = new Date(1990, 5, 5, 0, 0, 0, 0);
        const emitStub = sinon.stub();
        vm.$emit = emitStub;
        vm.date = mockDate;

        // ACT
        vm.$watchers.date();

        // ASSERT
        expect(emitStub).to.have.been.calledWith('input', mockDate);
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
      const mockDate = new Date(1990, 5, 5, 0, 0, 0, 0);
      vm.value = mockDate;

      // ACT
      vm.$lifecycleMethods.created();

      // ASSERT
      expect(vm.date).to.equal(mockDate);
    });
  });
});
