class Utils {
  static formatDate(date, format, locale = 'pt-BR') {
    const formatMap = {
      numeric: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      },
    };

    try {
      const formatedDate = new Intl.DateTimeFormat(
        locale,
        formatMap[format]
      ).format(new Date(date));

      return formatedDate;
    } catch (error) {
      return '-';
    }
  }
}

export default Utils;
