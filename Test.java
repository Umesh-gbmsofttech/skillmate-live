import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class Test {

    public static void main(String[] args) {
        String[] names = { "John", "Mary", "Bob", "Alice" };

        // Print names using for-each loop
        System.out.println("Names using for-each loop:");
        for (String name : names) {
            System.out.println(name);
        }

        // Print names using forEach method of Arrays class
        System.out.println("\nNames using forEach method of Arrays class:");
        Arrays.asList(names).forEach(name -> System.out.println(name));

        // Print names using forEach method of ArrayList class
        System.out.println("\nNames using forEach method of ArrayList class:");
        List<String> list = Arrays.asList(names);
        list.forEach(name -> System.out.println(name));

        // Custom method to print names
        System.out.println("\nNames using custom method:");
        printNames(names, name -> System.out.println(name));

        int num[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
        List<Integer> evenNumbers = Arrays.stream(num)
                .filter(n -> n % 2 == 0)
                .boxed()
                .collect(Collectors.toList());

        System.out.println("Even numbers:");
        evenNumbers.forEach(System.out::println);

        int newArr[] = Arrays.stream(num)
                .filter(n -> n % 2 == 0)
                .toArray();

        System.out.println("Even numbers:");
        Arrays.stream(newArr).forEach(System.out::println);
    }

    // Custom method for printing names using a Consumer
    static void printNames(String[] names, Consumer<String> consumer) {
        for (String name : names) {
            consumer.accept(name);
        }
    }

    // Custom method for printing number using a Consumer
    static void printNumbers(int[] num, Consumer<int> consumer) {
        for (int num : num) {
            consumer.accept(num);
        }
    }
}
